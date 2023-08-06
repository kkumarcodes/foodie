import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { useUserStore } from '@stores';
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import {
  PhoneAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import PhoneNumber from 'awesome-phonenumber';
import { firebaseFunctions, firebaseAuth } from 'boot/firebase';
import { httpsCallable } from 'firebase/functions';
import { categoriesList } from 'src/utils/initials';
import { Loading } from 'quasar';

export function setProfileSnapshotSubscription({ uid, userDocRef }) {
  unsubscribeProfileSnapshot();
  const userStore = useUserStore();
  const profileSnapshotUnsubscribe = onSnapshot(userDocRef, userDoc => {
    let userData = userDoc.data();
    userStore.$patch({ profile: { ...userData, uid } });
  });
  userStore.$patch({ profileSnapshotUnsubscribe });
}

export function unsubscribeProfileSnapshot() {
  const userStore = useUserStore();
  !!userStore.profileSnapshotUnsubscribe &&
    userStore.profileSnapshotUnsubscribe();
  userStore.$patch({ profileSnapshotUnsubscribe: null });
}

export async function getMyService() {
  const userStore = useUserStore();
  const user = firebaseAuth.currentUser;
  const { uid } = user;
  const getServiceByUid = httpsCallable(
    firebaseFunctions,
    'service-getServiceByUid'
  );

  const { data } = await getServiceByUid({
    uid,
  })
  if (data) {
    let _data = { ...data }
    _data.mainCategory = categoriesList.filter(el => el.value === data.mainCategory)?.[0] || null
    _data.subCategory = categoriesList.filter(el => el.value === data.mainCategory)?.[0]?.subCategories.filter(el => data.subCategory.includes(el.value)) || []

    console.log(_data, '==serviceData===')
    userStore.$patch({ service: { ..._data } });
  }
}
export async function createOrRestoreUserAndGetNextRoute({ uid, email, fullName }) {
  let route = { name: 'search' };
  try {
    const db = getFirestore();
    const userStore = useUserStore();
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      let userData = userDocSnap.data();
      userStore.$patch({ profile: { ...userData, uid } });

      const getServiceByUid = httpsCallable(
        firebaseFunctions,
        'service-getServiceByUid'
      );

      const { data } = await getServiceByUid({
        uid,
      })
      if (data) {
        let _data = { ...data }
        _data.mainCategory = categoriesList.filter(el => el.value === data.mainCategory)?.[0] || null
        _data.subCategory = categoriesList.filter(el => el.value === data.mainCategory)?.[0]?.subCategories.filter(el => data.subCategory.includes(el.value)) || []

        console.log(_data, '==serviceData===')
        userStore.$patch({ service: { ..._data, uid } });
      }

      route = userData.recentRoute || route;
    } else {
      const data = {
        email,
        fullName,
        recentRoute: { name: 'search' },
        uid,
      };
      await setDoc(userDocRef, data, { merge: true });
      userStore.$patch({ profile: { ...data } });
    }

    setProfileSnapshotSubscription({ uid, userDocRef });
  } catch (err) {
    console.error(err);
    alert(JSON.stringify(error));
  } finally {
    return route;
  }
}

export async function patchUserData({ uid, data }) {
  let success = false;
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, data, { merge: true });
    success = true;
  } catch (err) {
    console.error(err);
  } finally {
    return success;
  }
}

export async function patchUserServiceData({ uid, data }) {
  let success = false;
  try {
    const updateServiceByLocation = httpsCallable(
      firebaseFunctions,
      'service-updateServiceByLocation'
    );

    const response = await updateServiceByLocation({
      ...data
    });
    success = true;
  } catch (err) {
    console.error(err);
  } finally {
    return success;
  }
}

export async function getUserById(uid) {
  let user = null
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      user = userDocSnap.data();
    }
  } catch (err) {
    console.error(err);
  } finally {
    return user;
  }
}

export async function sendSMSCode(phoneNumber) {
  Loading.show();
  const userStore = useUserStore();
  const regionCode = 'US';
  const fullCountryCode = `+${PhoneNumber.getCountryCodeForRegionCode(
    regionCode
  )}`;
  try {
    userStore.$patch({ verificationId: '111111', phoneNumber });
  } catch (error) {
    console.log(error)
    userStore.$patch({ verificationId: null });
  } finally {
    Loading.hide();
  }
}

export async function verifyCodeAndSignIn({ verificationId, verificationCode }) {
  Loading.show();
  const userStore = useUserStore();
  const result = {};
  try {
    userStore.$patch({ verificationId: null });
    result.success = true;
  } catch (error) {
    console.log(error)
    result.success = false;
  } finally {
    Loading.hide();
    return result;
  }
}
