// helper functions
import { PushNotifications } from '@capacitor/push-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useCommonStore, useUserStore, useChatStore } from '@stores';
import { firebaseFunctions } from 'boot/firebase';
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings
} from 'capacitor-native-settings';
import { httpsCallable } from 'firebase/functions';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString
} from 'firebase/storage';
import { colors, Dialog, Platform } from 'quasar';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog.vue';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor } from '@capacitor/core';
import * as Sentry from "@sentry/browser";
import { $router } from 'src/router';

const { getPaletteColor, brightness } = colors;

// function to set the status bar color and style
export function setStatusBarColor(color = 'primary-700') {
  const statusBarColor = getPaletteColor(color);
  const statusBarStyle =
    brightness(statusBarColor) < 128 ? Style.Dark : Style.Light;
  if (Platform.is.android) {
    StatusBar.setBackgroundColor({
      color: statusBarColor
    });
  }
  StatusBar.setStyle({ style: statusBarStyle });
}

export async function uploadDataUrl({ refPath, dataUrl }) {
  let downloadURL = null;
  try {
    const storage = getStorage();
    const storageRef = ref(storage, refPath);
    const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
    downloadURL = await getDownloadURL(snapshot.ref);
  } catch (err) {
    console.error(err);
  } finally {
    return downloadURL;
  }
}

export async function uploadBase64Data({ refPath, base64data }) {
  let downloadURL = null;
  try {
    const storage = getStorage();
    const storageRef = ref(storage, refPath);
    // [TODO] Capacitor only supports jpeg for android and ios. Change content type later
    const snapshot = await uploadString(storageRef, base64data, 'base64', {
      contentType: 'image/jpg'
    });
    downloadURL = await getDownloadURL(snapshot.ref);
  } catch (err) {
    console.error(err);
  } finally {
    return downloadURL;
  }
}

export async function uploadBase64Images({ images, refPath, refName }) {
  const imageUploadPromises = images.map(image => {
    const timestamp = new Date().toISOString();
    return uploadBase64Data({
      refPath: `${refPath}/${refName}-${timestamp}`,
      base64data: image.data
    });
  });
  return Promise.all(imageUploadPromises);
}

export async function registerNotifications() {

  // Android 13 requires a permission check in order to receive push notifications. 
  // You are required to call checkPermissions() and requestPermissions() accordingly, 
  // when targeting SDK 33.

  // iOS
  // This plugin does not support iOS Silent Push (Remote Notifications). 
  // We recommend using native code solutions for handling these types of notifications, 
  // see Pushing Background Updates to Your App.

  // Android
  // This plugin does support data-only notifications, but will NOT call pushNotificationReceived
  // if the app has been killed. To handle this scenario, you will need to create a service that extends FirebaseMessagingService,
  // see Handling FCM Messages.

  let permStatus = await PushNotifications.checkPermissions();
  const userStore = useUserStore();
  const chatStore = useChatStore();

  const { updateUserProfile } = userStore;
  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
    console.log('permStatus.receive:prompt', permStatus);
  }

  if (permStatus.receive !== 'granted') {
    showPermissionDialog('Push notification');
    console.error('User denied push notification permissions!');
    return;
  }

  // Register with Apple / Google to receive push via APNS/FCM
  await PushNotifications.register();
  try {
    await PushNotifications.removeAllListeners()
  } catch(error) {

  }
  
  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration', token => {
    if (Capacitor.getPlatform() === 'ios') {
      FCM.getToken()
        .then(async result => {
          const userData = {
            fcmToken: result.token,
            platform: 'ios'
          };
          updateUserProfile({ data: userData });
          console.log('result.token', result.token); // This is token for IOS
        })
        .catch(err => console.log('i am Error', err));
    } else {
      const userData = {
        fcmToken: token.value,
        platform: 'android'
      };
      updateUserProfile({ data: userData });
      console.log('result.token', token.value); // This is token for Android
    }
    console.log('Push registration success, token: ' + token.value);
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError', error => {
    console.error('Error on registration: ' + JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener(
    'pushNotificationReceived',
    async notification => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    async notification => {
      const data = notification.notification.data;
      console.log(
        'Action performed: ', $router.location, JSON.stringify(data)
      );
      if (data?.type === 'inviteFriend') {
        $router.push({path: `/circle/${data?.sourceUid}`});
      } else if (data?.type === 'addSuggestion') {
        $router.push({ path: `/ask/${data?.askId}`});
      } else if (data?.type === 'snagFave') {
        $router.push({ path: `/fave/${data?.faveId}`});
      } else if (data?.type === 'askFave') {
        $router.push({ path: `/ask/${data?.id}`});
      } else if (data?.type === 'message') {
        $router.push({ name: 'ask-details', params: { id: data?.askId } });
      }
    }
  );

  return;
}

export function setAppHeader(options) {
  const commonStore = useCommonStore();
  const { setAppHeaderConfig, resetAppHeaderConfig } = commonStore;

  resetAppHeaderConfig();
  setAppHeaderConfig(options);
}

export function showPermissionDialog(content) {
  Dialog.create({
    component: ConfirmationDialog,
    componentProps: {
      theme: 'primary',
      title: `Allow access to your ${content}`,
      message: `Please go to settings app and allow the Foodie
          app to access ${content} on your device.`,
      primaryLabel: 'Settings'
    }
  }).onOk(() => {
    if (Platform.is.android) {
      NativeSettings.openAndroid({
        option: AndroidSettings.ApplicationDetails
      });
    }
    if (Platform.is.ios) {
      NativeSettings.openIOS({
        option: IOSSettings.App
      });
    }
  });
}

export async function sendPushnotification(fcmToken, data) {
  const handleSendPushNotification = httpsCallable(
    firebaseFunctions,
    'common-sendPushNotification'
  );

  const response = await handleSendPushNotification({
    fcmToken,
    ...data
  });
}
export async function sendMultiPushnotification(fullName, body, _data) {
  const handleSendPushNotification = httpsCallable(
    firebaseFunctions,
    'common-sendNotifications'
  );
  const response = await handleSendPushNotification({
    fullName,
    body,
    _data
  });
}

export function sentryMessage(message, extra) {
  Sentry.withScope(scope => {
    if (extra) {
      for (const key in extra) {
        scope.setExtra(key, extra[key])
      }
    }
    Sentry.captureMessage(message)

  })
}

export function sentryException(err, extra) {
  console.error(err);
  Sentry.withScope(scope => {
    if (extra) {
      for (const key in extra) {
        scope.setExtra(key, extra[key])
      }
    }
    Sentry.captureException(err)

  })
}

export function reviewsFormatString(num = 0) {
  if (num < 100) return num;
  if (num >= 100) return num / 1000 + 'K'
  if (num >= 1000000) return num / 1000000 + 'M'
}
