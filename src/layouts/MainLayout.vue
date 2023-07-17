<template>
  <q-layout view="hHh lpr fFf" class="bg-light">
    <q-header class="bg-dark text-white">
      <AppHeader />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppNavigation v-if="showAppNavigation" />
  </q-layout>
</template>

<script>
  import { useUserStore } from '@stores';
  import { setStatusBarColor } from '@utils/helpers/common';
  import AppHeader from 'components/common/navigation/AppHeader.vue';
  import AppNavigation from 'components/common/navigation/AppNavigation.vue';
  import { defineComponent, onBeforeMount, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { registerNotifications } from '@utils/helpers/common';

  export default defineComponent({
    name: 'MainLayout',
    components: { AppNavigation, AppHeader },
    setup() {
      const userStore = useUserStore();
      const route = useRoute();
      const showAppNavigation = computed(() => {
        if (route.name === 'suggest-category') {
          return false;
        }
        return (
          !!userStore.isSignedIn &&
          !userStore.firstTimeInviteFriends &&
          route.name != 'offline'
        );
      });
      onBeforeMount(() => {
        registerNotifications();
        setStatusBarColor('white');
      });
      return { showAppNavigation };
    }
  });
</script>
