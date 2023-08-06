import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { uploadDataUrl, sentryException } from '@utils/helpers/common';
import PhoneNumber from 'awesome-phonenumber';
import {
  createOrRestoreUserAndGetNextRoute,
  patchUserServiceData,
  patchUserData,
} from '@utils/helpers/user';
import { firebaseFunctions, firebaseAuth } from 'boot/firebase';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { defineStore } from 'pinia';
import { Loading, QSpinnerOrbit } from 'quasar';
import state from './state';
import { uploadBase64Images } from 'src/utils/helpers/common';

const useUserStore = defineStore('user', {
  state,
  getters: {
    hasLocalUnreadNotifications(state) {
      return state.notifications.some(
        notification => notification.read === false
      );
    }
  },
  actions: {
    async registerUser(formData) {
      Loading.show({ spinner: QSpinnerOrbit });
      const result = {};
      try {

        const res = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
          .then(async signInResult => {
            result.success = true;
            const user = firebaseAuth.currentUser;
            const { uid, email } = user;
            const route = await createOrRestoreUserAndGetNextRoute({
              uid,
              email,
              fullName: formData.fullName
            });
            result.route = route;
          })
          .catch(err => {
            console.log(err)
            result.code = err.code;
            result.success = false;
          });
      } catch (error) {

      } finally {
        Loading.hide();
        return result;
      }
    },

    async loginUser(formData) {
      Loading.show({ spinner: QSpinnerOrbit });
      const result = {};
      try {

        const res = await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
          .then(async signInResult => {
            result.success = true;
            const user = firebaseAuth.currentUser;
            const { uid, email } = user;
            const route = await createOrRestoreUserAndGetNextRoute({
              uid,
              email,
            });
            result.route = route;
          })
          .catch(err => {
            console.log(err)
            result.code = err.code;
            result.success = false;
          });
      } catch (error) {

      } finally {
        Loading.hide();
        return result;
      }
    },

    async changePassword(newPassword) {
      Loading.show({ spinner: QSpinnerOrbit });
      const result = {};
      try {
        const user = firebaseAuth.currentUser;
        await updatePassword(user, newPassword)
        result.success = true;
      } catch (error) {
        console.log(error)
        result.error = error;
        result.success = false;
      } finally {
        Loading.hide();
        return result;
      }
    },
    async updateUserProfile({ data, loading = true }) {
      loading && Loading.show({ spinner: QSpinnerOrbit });
      const result = {};
      try {
        const user = firebaseAuth.currentUser;
        const { uid } = user;
        result.success = await patchUserData({ uid, data });
        this.$patch({ profile: { ...this.profile, ...data, uid } });
      } catch (error) {
        result.success = false;
        result.error = error;
      } finally {
        loading && Loading.hide();
        return result;
      }
    },

    async updateUserService({ data, images }) {
      Loading.show({ spinner: QSpinnerOrbit });
      const result = {};

      try {

        const user = firebaseAuth.currentUser;
        const { uid } = user;

        const refPath = `services/${uid}`;
        const imageUrls = await uploadBase64Images({
          images: images.filter(image => image.isUrl == undefined),
          refPath,
          refName: 'images'
        });

        imageUrls.push(
          ...images
            .filter(image => image.isUrl != undefined)
            .map(image => image.isUrl)
        );

        data.images = imageUrls;
        data.mainCategory = data.mainCategory.value;
        data.subCategory = data.subCategory.map(el => el.value);
        data.uid = uid;
        result.success = await patchUserServiceData({ uid, data });
      } catch (error) {

        sentryException(error)
        result.success = false;
      } finally {
        Loading.hide();
        return result;
      }
    },
    async uploadServiceAvatar({ dataUrl }) {
      const result = { success: false };
      Loading.show({ spinner: QSpinnerOrbit });
      try {
        const user = firebaseAuth.currentUser;
        const { uid } = user;
        const refPath = `services/${uid}/avatar`;
        const avatarUrl = await uploadDataUrl({ refPath, dataUrl });
        if (avatarUrl) {
          result.success = true;
          result.data = avatarUrl;
        }
      } catch (err) {
        sentryException(err)
      } finally {
        Loading.hide();
        return result;
      }
    },

    async signOut() {
      // 1. Sign out on the native layer
      // 1. Sign out on the web layer
      await firebaseAuth.signOut();
    },

    async uploadAvatar({ dataUrl }) {
      const result = { success: false };
      Loading.show({ spinner: QSpinnerOrbit });
      try {
        const user = firebaseAuth.currentUser;
        const { uid } = user;
        const refPath = `users/${uid}/avatar`;
        const avatarUrl = await uploadDataUrl({ refPath, dataUrl });
        if (avatarUrl) {
          result.success = true;
          result.data = avatarUrl;
        }
      } catch (err) {
        sentryException(err)
      } finally {
        Loading.hide();
        return result;
      }
    },

    async addFeedback(msg) {
      const result = { success: false };
      Loading.show({ spinner: QSpinnerOrbit });
      try {
        const addFeedbackAPI = httpsCallable(
          firebaseFunctions,
          'user-addFeedback'
        );
        const data = {
          message: msg,
        }

        const response = await addFeedbackAPI(data);

        result.success = true;
        result.data = response.data;
      } catch (err) {

        sentryException(err)
      } finally {
        Loading.hide();
        return result;
      }
    },

    async addReview(data) {
      Loading.show({ spinner: QSpinnerOrbit });
      const result = {};

      try {
        result.success = await patchUserServiceData({ data });
      } catch (error) {

        sentryException(error)
        result.success = false;
      } finally {
        Loading.hide();
        return result;
      }
    },

    async reportResource(type, resourceId) {
      const result = { success: false };
      Loading.show({ spinner: QSpinnerOrbit });
      try {
        const reportServiceAPI = httpsCallable(
          firebaseFunctions,
          'user-reportService'
        );
        const data = {
          type,
          resourceId,
        }

        const response = await reportServiceAPI(data);
        result.success = true;
        result.data = response.data;
      } catch (err) {

        sentryException(err)
      } finally {
        Loading.hide();
        return result;
      }
    },

    async deleteUser() {
      const result = { success: false };
      Loading.show({ spinner: QSpinnerOrbit });
      try {
        const deleteUserAPI = httpsCallable(
          firebaseFunctions,
          'user-deleteUser'
        );

        const response = await deleteUserAPI(data);
        result.success = true;
        result.data = response.data;
      } catch (err) {

        sentryException(err)
      } finally {
        Loading.hide();
        return result;
      }
    },


    async getNotificationFeed() {

      const user = firebaseAuth.currentUser;
      const { uid } = user;
      let createdAt = new Date();
      createdAt.setMonth(createdAt.getMonth() - 1);
      const data = {
        createdAt,
      }
      const getNotificationFeedAPI = httpsCallable(
        firebaseFunctions,
        'notification-getNotificationFeed'
      );

      const response = await getNotificationFeedAPI(data);

      this.$patch(state => {
        state.notifications = response.data;
        state.hasUnreadNotifications = !!response.data.find(
          notification => notification?.read === false
        );
      });
    },
    async markAllNotificationsRead() {
      const result = { success: false };
      try {
        const markAllNotificationsReadAPI = httpsCallable(
          firebaseFunctions,
          'notification-markAllNotificationsRead'
        );
        markAllNotificationsReadAPI();
        result.success = true;
      } catch (err) {

        sentryException(err)
      } finally {
        return result;
      }
    },
  },
  
});

export default useUserStore;
