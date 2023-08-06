import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
  isNavigationFailure,
  NavigationFailureType,
} from 'vue-router';
import routes from './routes';
import { useUserStore } from '@stores';
import { App } from '@capacitor/app';
import { Toast } from '@capacitor/toast';

export let $router;

const router = () => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: (to, from, savedPosition) => {
      from.meta.toHistory = savedPosition != null;
      if (savedPosition) {
        return savedPosition;
      } else {
        return { left: 0, top: 0 };
      }
    },
    routes,

    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  });

  // global navigation guard
  Router.beforeEach((to, from) => {
    const userStore = useUserStore();
    // handle exit from dashboard if back/forward pressed
    if (from.name == 'search' && !!from.meta.toHistory) {
      if (!userStore.backButtonForExit) {
        userStore.$patch({ backButtonForExit: true });
        Toast.show({
          text: 'Press back again to exit app!',
          duration: 'short',
          position: 'bottom'
        });
        setTimeout(() => {
          userStore.$patch({ backButtonForExit: false });
        }, 3000);
        return false;
      }
      userStore.$patch({ backButtonForExit: false });
      App.exitApp();
    }
    if (to.meta?.requiresAuth && !userStore.isSignedIn) {
      return {
        name: 'login'
      };
    }
  });

  Router.afterEach((to, from, failure) => {
    // Any kind of navigation failure
    if (isNavigationFailure(failure)) {
      console.log('isNavigationFailure(failure)')
    }
    // Only duplicated navigations
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.log('isNavigationFailure(failure, NavigationFailureType.duplicated)')
    }
    // Aborted or canceled navigations
    if (isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.canceled)) {
      console.log('NavigationFailureType.aborted)')
    }
  })
  $router = Router
  return Router;
}

export default router
