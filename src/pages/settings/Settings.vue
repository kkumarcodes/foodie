<template>
  <q-page class="column no-wrap q-px-md q-py-lg text-grey-700 bg-light">
    <q-item>
      <q-item-section>Applications</q-item-section>
    </q-item>
    <template
      v-for="(setting, index) in settingsMenu"
      :key="`settings-${index}`"
    >
      <div class="q-mb-xs">
        <q-item clickable @click="gotoPage(setting.routeName)">
          <q-item-section avatar>
            <img class="ggprofile-icon" alt="" :src="setting.icon"/>
          </q-item-section>
          <q-item-section>{{ setting.label }}</q-item-section>
          <q-item-section side>
            <q-icon color="grey-500" size="1em"  :name="'ti-angle-right'" />
          </q-item-section>
        </q-item>
      </div>
    </template>

    <q-card flat class="bg-transparent">
      <q-item clickable @click="onDeleteClicked">
        <q-item-section avatar>
          <img class="ggprofile-icon" alt="" src="/delete.svg" />
        </q-item-section>
        <q-item-section class="text-error-600"> <span >Delete Account</span> </q-item-section>
      </q-item>
    </q-card>

    <q-item>
      <q-item-section>About</q-item-section>
    </q-item>
    <template
      v-for="(setting, index) in abountMenu"
      :key="`settings-${index}`"
    >
      <div class="q-mb-xs">
        <q-item clickable @click="gotoPage(setting.routeName)">
          <q-item-section avatar>
            <img class="ggprofile-icon" alt="" :src="setting.icon" />
          </q-item-section>
          <q-item-section>{{ setting.label }}</q-item-section>
          <q-item-section side>
            <q-icon color="grey-500" size="1em"  :name="'ti-angle-right'" />
          </q-item-section>
        </q-item>
      </div>
    </template>

    <q-card flat class="bg-transparent">
      <q-item clickable @click="onLogoutClicked">
        <q-item-section avatar>
          <img class="ggprofile-icon" alt="" src="/logout.svg" />
        </q-item-section>
        <q-item-section class="text-error-600"> Logout </q-item-section>
      </q-item>
    </q-card>

    <q-space />
    <div class="q-pa-3xs q-mb-5xl text-right text-body2 text-grey-400">
      Version {{ appVersion }}
    </div>
  </q-page>
</template>

<script setup>
  import { App } from '@capacitor/app';
  import { useUserStore } from '@stores';
  import { unsubscribeProfileSnapshot } from '@utils/helpers/user';

  import { setAppHeader } from 'src/utils/helpers/common';
  import { resetStore } from 'src/utils/helpers/resources';
  import { settingsMenuList, aboutMenuList } from 'src/utils/initials';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  import ConfirmationDialog from 'src/components/common/ConfirmationDialog.vue';

  setAppHeader({ title: 'Settings', backNav: false });

  const settingsMenu = computed(() => {
    return settingsMenuList;
  });

  const abountMenu = computed(() => {
    return aboutMenuList;
  });

  const router = useRouter();
  const userStore = useUserStore();
  const { signOut, deleteUser } = userStore;
  const $q = useQuasar();

  const appVersion = ref(null);
  App.getInfo().then(appInfo => {
    appVersion.value = appInfo.version;
  });

  function onLogoutClicked() {
    $q.dialog({
      component: ConfirmationDialog,
      componentProps: {
        theme: 'error',
        primaryLabel: 'Yes, log me out',
        title: 'Log out',
        message: 'You will be logged out immediately you click “logout” below'
      }
    }).onOk(() => {
      handleSignOut();
    });
  }

  function gotoPage(routeName) {
    if (routeName === 'privacy-policy') {
      window.open('https://foodie.com/foodie/privacy-policy')
    } else if (routeName === 'terms') {
      window.open('https://foodie.com/foodie/terms')
    } else if (routeName === 'about') {
      window.open('https://foodie.com/foodie/about')
    } else {
      router.push({ name: routeName })
    }
    
  }

  function onDeleteClicked() {
    $q.dialog({
      component: ConfirmationDialog,
      componentProps: {
        theme: 'error',
        primaryLabel: 'Yes, delete me',
        title: 'Delete User',
        message: 'The account will delete permanently'
      }
    }).onOk(() => {
      handleDelete()
    });
  }
  async function handleDelete() {
    await deleteUser();
    router.replace({ name: 'login' });
  }
  async function handleSignOut() {
    unsubscribeProfileSnapshot();
    await signOut();
    resetStore();
    router.replace({ name: 'login' });
  }
</script>
