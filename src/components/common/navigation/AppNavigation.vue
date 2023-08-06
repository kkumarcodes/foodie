<template>
  <q-footer class="bg-white z-max footer-shadow" ref="appNavRef">
    <div class="full-width q-px-md q-py-sm bg-white row items-center">
      <div
        v-for="(nav, navIndex) in navItems"
        :key="`app-nav-${navIndex}`"
        class="col flex items-center justify-center"
        :class="[nav.class]"
      >
        <q-avatar
          class="cursor-pointer"
          size="48px"
          font-size="24px"
          :color="
            activeNav === nav.name
              ? 'primary-50'
              : 'transparent'
          "
          :text-color="
            activeNav === nav.name
              ? 'primary'
              : 'grey-500'
          "
          :icon="activeNav === nav.name ? nav.activeIcon || nav.icon : nav.icon"
          @click="handleNav(nav)"
        >
          <q-badge
            floating
            color="primary"
            rounded
            v-if="nav.name == 'notifications' && !!showNotificationBadge"
          />
        </q-avatar>
      </div>
    </div>
  </q-footer>
</template>

<script>
  import { useQuasar } from 'quasar';
  import { useCommonStore, useUserStore, useDashboardStore } from 'src/stores';
  import { computed, defineComponent, ref, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    name: 'AppNavigation',
    setup(props) {
      const $q = useQuasar();
      const appNavRef = ref(null);
      const createDialogRef = ref(null);
      const activeNav = ref();
      const router = useRouter();
      const $route = useRoute();

      const commonStore = useCommonStore();

      const userStore = useUserStore();

      const dashboardStore = useDashboardStore();

      const rootRouteName = computed(() => $route.name);
      // watching effect for root route changes
      watchEffect(() => {
        activeNav.value = rootRouteName.value;
      });

      const showNotificationBadge = computed(
        () => userStore.hasUnreadNotifications
      );
      const navItems = ref([
        {
          name: 'search',
          icon: 'ti-search',
          class: 'order-first'
        },
        {
          name: 'notifications',
          icon: 'ti-bell',
          class: 'order-last'
        },
        {
          name: 'settings',
          icon: `ti-settings`,
          class: 'order-last'
        }
      ]);
      function handleNav(nav) {
        if ($route.name == nav.name) {
          return;
        }
        activeNav.value = nav.name;
        commonStore.$patch({ skipReload: false });

        if (nav.name == 'search') {
          dashboardStore.$patch({ searchInitiated: false });
        }
        router.replace({ name: nav.name });
      }
      return {
        appNavRef,
        navItems,
        activeNav,
        handleNav,
        createDialogRef,
        showNotificationBadge
      };
    }
  });
</script>

<style lang="scss" scoped>
  .q-badge {
    line-height: 8px;
    font-size: 8px;
    min-height: 8px;
    padding: 2px 4px;
    &--floating {
      top: 2px;
      right: 2px;
    }
  }
</style>
