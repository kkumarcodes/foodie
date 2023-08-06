<template>
  <q-page class="column q-pa-md bg-light">
    <div class="text-body2 text-grey-500 q-mb-lg">
      Please enter your information below.
    </div>
    <div for="email" class="text-body2 text-weight-medium text-grey-700 q-mb-2xs q-mt-lg">
      New Password *
    </div>
    <q-input outlined placeholder="New Password" v-model="newPassword" type="password">
      <template v-slot:prepend>
        <img alt="" src="/password.svg" />
      </template>
    </q-input>
    <div for="email" class="text-body2 text-weight-medium text-grey-700 q-mb-2xs q-mt-lg">
      Confirm Password *
    </div>
    <q-input outlined placeholder="Confirm Password" v-model="confirmPassword" type="password">
      <template v-slot:prepend>
        <img alt="" src="/password.svg" />
      </template>
    </q-input>
    <q-btn unelevated no-caps color="primary" text-color="white" class="text-body1 text-weigt-medium q-mt-xl"
      label="Update Password" padding="10px" :disable="!isFormValid" @click="updatePassword" />
  </q-page>
</template>

<script setup>
import { setAppHeader } from '@utils/helpers/common';
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores';
import { ref, computed } from 'vue';

setAppHeader({
  title: 'Change password',
  backNav: true
});

const userStore = useUserStore();
const { changePassword } = userStore;

const newPassword = ref('');
const confirmPassword = ref('');
const $q = useQuasar();

const isFormValid = computed(() => {
  return (
    String(newPassword.value).length >= 6 &&
    String(newPassword.value) !== '' &&
    String(newPassword.value) === String(confirmPassword.value)
  );
});

async function updatePassword() {
  const response = await changePassword(newPassword.value);

  if (!response.success && response.error) {
    $q.notify({
      type: 'error',
      message: 'You need to logout and login first.',
      caption: 'Password change failed'
    });
  } else if (response.success) {
    $q.notify({
      type: 'primary',
      message: 'Change password successfully',
      caption:
        'Success'
    });
  }
}
</script>
