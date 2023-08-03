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
  const createHistory = createWebHistory;

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
  $router = Router
  return Router;
}

export default router
