<template>
  <q-page class="bg-light q-px-md q-py-xl">
    <div class="column flex-center q-mb-xl">
      <q-avatar
        color="primary-50"
        size="96px"
        text-color="primary"
        class="q-mb-sm"
      >
        <q-img
          v-if="profilePic || avatar"
          :src="(profilePic && profilePic.dataUrl) || avatar"
          :ratio="1"
        />
        <q-icon v-else name="ti-user" />
      </q-avatar>

      <q-btn
        no-caps
        flat
        color="primary"
        class="text-caption text-weight-medium"
        label="Change Picture"
        padding="0"
        @click="onChangePicture"
      />
    </div>

    <q-form ref="updateProfileForm" @submit.prevent="onUpdateProfile">
      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Full Name<sup>*</sup>
        </div>
        <q-input
          outlined
          placeholder="Full Name"
          v-model="updatedUser.fullName"
          :rules="[
            val => val.length <= 25 || 'Please use maximum 20 characters'
          ]"
          @keydown="isValidName($event)"
          @update:model-value="value => onUpdateName(value, 'fullName')"
          lazy-rules="ondemand"
        />
      </div>
      
      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Email address
        </div>
        <q-input
          outlined
          placeholder="Email"
          v-model="updatedUser.email"
          type="email"
          :rules="[val => emailRule(val)]"
        />
      </div>
      <q-btn
        no-caps
        unelevated
        color="primary"
        text-color="white"
        label="Update profile"
        class="text-weight-medium text-subtitle2 q-mt-lg full-width"
        :disable="!isProfileValid"
        type="submit"
      />
    </q-form>
  </q-page>
</template>

<script setup>
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  import { setAppHeader } from '@utils/helpers/common';
  import { useQuasar } from 'quasar';
  import ConfirmationDialog from 'src/components/common/ConfirmationDialog.vue';

  import { useCommonStore, useUserStore } from 'src/stores';
  import { useObtainCameraPermissions } from 'src/utils/helpers/permission';
  import { isValidEmail } from 'src/utils/validations';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { showPermissionDialog } from '@utils/helpers/common';

  setAppHeader({
    title: 'My Profile',
    backNav: true
  });

  // Data
  const userStore = useUserStore();
  const updateProfileForm = ref(null);
  const profilePic = ref(undefined);
  const updatedUser = ref({
    fullName: userStore.profile?.fullName || '',
    email: userStore.profile?.email || ''
  });

  const $q = useQuasar();
  const router = useRouter();
  const { updateUserProfile, uploadAvatar } = userStore;

  // Computed property
  const avatar = computed(() => userStore.profile?.avatar);
  const isProfileValid = computed(
    () => updatedUser.value.fullName && updatedUser.value.email
  );

  function emailRule(val) {
    if (val.length > 0) {
      return isValidEmail(val) || 'Please enter valid email';
    }

    return true;
  }

  // Methods
  function isValidName(e) {
    if (!/^[a-zA-Z\s]+$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function onUpdateName(e, field) {
    updatedUser.value[field] = e.replace(/[^a-zA-Z\s]+/g, '');
  }

  async function onChangePicture() {
    const permissionsResult = await useObtainCameraPermissions();

    if (permissionsResult.permissionDenied && permissionsResult.showDialog) {
      showPermissionDialog(permissionsResult.message);
      return;
    }

    if (permissionsResult.permissionDenied && !permissionsResult.showDialog) {
      return;
    }

    try {
      const cameraImage = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        width: 120,
        height: 120
      });

      profilePic.value = cameraImage;
    } catch (err) {
      // in case user cancels
      console.error(err);
    }
  }

  async function onUpdateProfile() {
    const isValidForm = await updateProfileForm.value.validate();
    if (!isValidForm) {
      return;
    }

    if (
      updatedUser.value.email?.trim().length > 0 &&
      !isValidEmail(updatedUser.value.email)
    ) {
      $q.dialog({
        component: ConfirmationDialog,
        componentProps: {
          theme: 'error',
          title: `Invalid email`,
          message: `Please enter a valid email`,
          primaryLabel: 'OK'
        }
      });

      return;
    }

    const userData = updatedUser.value;

    const profileImageDataUrl = profilePic.value?.dataUrl;

    if (profileImageDataUrl) {
      // profile image selected
      const uploadResult = await uploadAvatar({
        dataUrl: profileImageDataUrl
      });

      if (!uploadResult.success) {
        return;
      }

      userData.avatar = uploadResult.data;
    }

    const updatedResult = await updateUserProfile({ data: userData });
    if (!updatedResult.success) return;

    $q.notify({
      type: 'primary',
      message: 'Profile Saved!',
      caption: 'Your profile has been successfully updated.'
    });
    router.replace({ name: 'profile' });
  }
</script>

<style lang="scss" scoped>
  .q-avatar {
    border: 4px solid #fff;

    :deep(.q-avatar__content) {
      width: 100%;
      height: 100%;
    }
  }

  .q-date {
    :deep(.q-date__calendar-item) {
      button {
        min-width: 32px;
        width: auto;
      }
    }
  }
</style>
