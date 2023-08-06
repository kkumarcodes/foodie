<template>
  <q-page class="column q-pa-md bg-light">
    <div class="text-body2 text-grey-500 q-mb-lg">
      Please change your notification settings below.
    </div>
    <q-list>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>General notification</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="green" v-model="generalNotifications" val="friend"  @click="onChangeGeneralNotification"/>
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Chat notification</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle color="green" v-model="chatNotifications" val="friend" @click="onChangeChatNotification" />
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<script setup>
import { setAppHeader } from '@utils/helpers/common';
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores';
import { ref } from 'vue';

setAppHeader({
  title: 'Notification settings',
  backNav: true
});

const userStore = useUserStore();
const { updateUserProfile } = userStore;

const chatNotifications = ref(userStore.profile?.settings?.chatNotification || true);
const generalNotifications = ref(userStore.profile?.settings?.generalNotifications || true);
const $q = useQuasar();

async function onChangeChatNotification() {
  const settings = userStore.profile?.settings || {}
  settings.chatNotification = !settings.chatNotification
  const updatedResult = await updateUserProfile({
    data: {
      settings
    }
  });

  if (!updatedResult.success) return;
  userStore.$patch(state => {
    state.profile.settings = settings;
  });
}

async function onChangeGeneralNotification() {
  const settings = userStore.profile?.settings || {}
  settings.generalNotification = !settings.generalNotification
  const updatedResult = await updateUserProfile({
    data: {
      settings
    }
  });

  if (!updatedResult.success) return;
  userStore.$patch(state => {
    state.profile.settings = settings;
  });
}

</script>
