import { boot } from 'quasar/wrappers';
import { Loading, QSpinnerOrbit } from 'quasar';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { useUserStore } from '@stores';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  onAuthStateChanged,
  indexedDBLocalPersistence,
  connectAuthEmulator,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore
  
} from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { createOrRestoreUserAndGetNextRoute } from '@utils/helpers/user';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: indexedDBLocalPersistence
});

const firebaseFunctions = getFunctions();
const firestoreDB = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true
});

// Connecting emulator for local dev
// FirebaseAuthentication.useEmulator({
//   host: `127.0.0.1`,
//   port: 9099
// });
// connectAuthEmulator(firebaseAuth, `http://127.0.0.1:9099`);
// connectFunctionsEmulator(
//   firebaseFunctions,
//   `127.0.0.1`,
//   5001
// );
// connectFirestoreEmulator(firestoreDB, `127.0.0.1`, 8081);

export default boot(async () => {
  Loading.show({spinner: QSpinnerOrbit});
  const userStore = useUserStore();
  await new Promise(async resolve => {
    try {
      // attaching listener for auth state changed
      onAuthStateChanged(firebaseAuth, user => {
        if (user) {
          // user signed in
          userStore.isSignedIn = true;
          // get notification feed
          userStore.getNotificationFeed();
        } else {
          // user not signed in
          userStore.isSignedIn = false;
        }
        // resolving after we get the user signed in state
        resolve();
      });
    } catch (error) { }
  });
  // setting initial route name based on signed in user onboarding status
  if (userStore.isSignedIn) {
    const { uid, phoneNumber } = firebaseAuth.currentUser;
    await createOrRestoreUserAndGetNextRoute({
      uid,
      phoneNumber
    });
  }
  Loading.hide();
});

export { firebaseApp, firebaseAuth, firebaseFunctions, firestoreDB };
