import { boot } from 'quasar/wrappers';
import { Notify, Loading } from 'quasar';
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import { createPinia } from 'pinia';

// lock screen orientation to portrait
window.screen.orientation.lock('portrait');

const pinia = createPinia();

const primaryNotificationIconImg = require('assets/primary-notification.svg');
const warningNotificationIconImg = require('assets/warning-notification.svg');
const errorNotificationIconImg = require('assets/error-notification.svg');

Notify.setDefaults({
  position: 'top',
  timeout: 4000,
  badgeColor: 'light',
  badgeTextColor: 'dark',
  badgePosition: 'top-right',
  classes: 'tf-notification q-pa-md'
});

Notify.registerType('primary', {
  avatar: primaryNotificationIconImg,
  attrs: {
    role: 'primary'
  },
  actions: [{ icon: 'ti-trash', color: 'primary-500', class: 'close-btn' }]
});

Notify.registerType('warning', {
  avatar: warningNotificationIconImg,
  attrs: {
    role: 'warning'
  },
  actions: [{ icon: 'ti-info', color: 'warning-500', class: 'close-btn' }]
});

Notify.registerType('error', {
  avatar: errorNotificationIconImg,
  attrs: {
    role: 'error'
  },
  actions: [{ icon: 'ti-alert', color: 'error-500', class: 'close-btn' }]
});

Notify.registerType('create', {
  attrs: {
    role: 'create'
  },
  actions: [{ icon: 'ti-write', color: 'primary-500', class: 'close-btn' }]
});

// Loading defaults
Loading.setDefaults({
  spinnerSize: 48,
  spinnerColor: 'primary-25',
  backgroundColor: 'dark'
});

export default boot(({ app }) => {
  app.use(pinia);
  app.use(VueGoogleMaps, { // 🤿 Vue App. Please install Vue Google Maps
    load: {
      key:  ${process.env.GOOGLE_MAPS_API_KEY}, // 🤿 I don't have a google key, so leave it blank for now
    },
  });
});

export { pinia };
