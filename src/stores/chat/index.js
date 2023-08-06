import { firebaseAuth } from 'boot/firebase';
import {
  collection,
  doc,
  getFirestore,
  runTransaction,
  setDoc,
  getDocs,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { sendPushnotification } from 'src/utils/helpers/common';
import state from './state';
import { getUserById } from '@utils/helpers/user';

let unsubscribe;
const useCommonStore = defineStore('chat', {
  state,
  actions: {
    async setSenders(payload) {
      const { owner, sender } = payload;
      this.$patch({ owner, sender });
    },
    async sendMessage(payload, message) {
      const result = { success: false };
      try {
        const db = getFirestore();
        const { askId, owner, sender } = payload;

        const { uid: ownerId } = owner;
        const { uid: senderId } = sender;
        const { uid } = firebaseAuth.currentUser;
        const owner1 = await getUserById(ownerId);
        await runTransaction(db, async transaction => {

          const documentId = `${ownerId}${senderId}`;

          const docRef = doc(
            collection(db, 'chats', 'asks', askId, documentId, 'messages')
          );
          transaction.set(docRef, {
            senderId: uid,
            senderAvatar: uid == senderId ? sender?.avatar : owner?.avatar,
            firstName: uid == senderId ? sender?.firstName : owner?.firstName,
            message: message,
            created: serverTimestamp()
          });

          const notificationRef = doc(collection(db, 'notifications'));
          const notificationPayload = {
            type: 'ask-chat',
            resourceId: askId,
            sourceUid: uid,
            targetUid: uid == senderId ? ownerId : senderId,
            read: false
          };
          transaction.set(notificationRef, notificationPayload, {
            merge: true
          });
        });

        const fcmToken = uid === senderId ? owner1.fcmToken : sender.fcmToken;
        if (fcmToken)
          sendPushnotification(fcmToken, {
            fullName: uid === senderId ? sender.firstName : owner.firstName,
            body: message,
            _data: { askId, senderId, type: 'message', ownerId}
          });
      } catch (err) {
        console.error(err);
      } finally {
        return result;
      }
    },

    async getUsers(askId) {
      console.log('askId', askId);
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(
          collection(db, 'chats', 'asks', askId)
        );
        let userList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        userList.sort(
          (first, second) =>
            first.createdAt.toDate() - second.createdAt.toDate()
        );
        console.log('userList:', userList.length);
        this.$patch({ chatUsers: userList });
        //  querySnapshot.forEach(doc => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => ', doc.data());
        // });
      } catch (error) {
        console.log('err:', error);
      }
    },

    async getMessages(payload) {
      const { askId, owner, sender } = payload;

      const { uid: ownerId } = owner;
      const { uid: senderId } = sender;

      const documentId = `${ownerId}${senderId}`;
      console.log('documentId', documentId);

      const db = getFirestore();
      let messageList = [];
      unsubscribe = onSnapshot(
        collection(db, 'chats', 'asks', askId, documentId, 'messages'),
        { includeMetadataChanges: true },
        snapshot => {
          messageList = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          messageList.sort(
            (first, second) => first.created.toDate() - second.created.toDate()
          );

          if (messageList.length > 0) {
            const docRef = doc(db, 'chats', 'asks', askId, documentId);
            setDoc(docRef, {
              ...sender,
              lastMessage: messageList[messageList.length - 1].message
            });
          }
          this.$patch({ messages: messageList });
        }
      );
    },

    async handleUnsubscripbe() {
      if (unsubscribe) unsubscribe();
    }
  }
});

export default useCommonStore;
