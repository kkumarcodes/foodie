import { useUserStore } from '@stores';

const routes = [
  {
    path: '/',
    component: () => import('layouts/GetStartedLayout.vue'),
    beforeEnter: (to, from) => {
      const userStore = useUserStore();
      if (
        userStore.isSignedIn &&
        userStore.profile?.recentRoute?.name &&
        to.name !== userStore.profile.recentRoute.name
      ) {
        return {
          name: userStore.profile.recentRoute.name,
          params: userStore.profile.recentRoute.params
        };
      }
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/get-started/GetStarted.vue')
      },
      {
        path: '',
        name: 'register',
        component: () => import('pages/get-started/Register.vue')
      },
      {
        path: '',
        name: 'forgot-password',
        component: () => import('pages/get-started/ForgotPassword.vue')
      },
    ]
  },
  {
    path: '/service',
    component: () => import('layouts/ServiceLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'service-details',
        component: () => import('pages/service/ServiceDetails.vue')
      },
      {
        path: '/write-review',
        name: 'write-review',
        component: () => import('pages/service/WriteReview.vue')
      },
      {
        path: ':id',
        name: 'chat-private',
        component: () => import('pages/chat/PrivateChat.vue')
      },
      {
        path: ':id',
        name: 'chat-users',
        component: () => import('pages/chat/UserList.vue')
      },
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'edit',
        name: 'edit-profile',
        component: () => import('pages/profile/EditProfile.vue')
      },
      {
        path: 'account-settings',
        name: 'account-settings',
        component: () => import('pages/profile/settings/AccountSetting.vue')
      },
      {
        path: 'notification-settings',
        name: 'notification-settings',
        component: () => import('pages/profile/settings/NotificationSetting.vue')
      },
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('pages/settings/Settings.vue')
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('pages/settings/Feedback.vue')
      },
      {
        path: 'myservice',
        name: 'myservice',
        component: () => import('pages/settings/MyService.vue')
      },
    ]
  },
  {
    path: '/search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('pages/dashboard/Search.vue')
      },
      {
        path: 'offline',
        name: 'offline',
        component: () => import('pages/misc/Offline.vue')
      },
    ]
  },
  {
    path: '/notifications',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'notifications',
        component: () => import('pages/dashboard/Notifications.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/misc/Lost.vue')
  }
];

export default routes;
