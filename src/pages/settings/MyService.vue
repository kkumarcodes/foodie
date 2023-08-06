<template>
  <q-page class="bg-light q-px-md q-py-xl">
    <div class="column flex-center q-mb-xl">
      <q-avatar color="primary-50" size="96px" text-color="primary" class="q-mb-sm">
        <q-img v-if="profilePic || avatar" :src="(profilePic && profilePic.dataUrl) || avatar" :ratio="1" />
        <q-icon v-else name="ti-user" />
      </q-avatar>

      <q-btn no-caps flat color="primary" class="text-caption text-weight-medium" label="Change Picture" padding="0"
        @click="onChangePicture" />
    </div>

    <q-form ref="updateProfileForm" @submit.prevent="onUpdateMyService">
      <div class="q-mt-xl">
        <AddLocation @updatePlace="onUpdatePlace" @updateCoordinates="onUpdateCoordinates" :editMode="updatedService.fromGoogle"
          :editPlace="editPlace" />
      </div>
      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Title<sup>*</sup>
        </div>
        <q-input outlined placeholder="Full Name" v-model="updatedService.title" :rules="[
          val => val.length <= 50 || 'Please use maximum 50 characters'
        ]" @keydown="isValidName($event)" @update:model-value="value => onUpdateName(value, 'title')"
          lazy-rules="ondemand" />
      </div>
      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Description<sup>*</sup>
        </div>
        <q-input outlined type="textarea" placeholder="description" v-model="updatedService.description" :rules="[
          val => val.length <= 2000 || 'Please use maximum 2000 characters'
        ]" counter maxlength="2000">
        </q-input>
      </div>

      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Main Category<sup>*</sup>
        </div>
        <q-select outlined @update:model-value="value => onUpdateMainCategory(value)"
          v-model="updatedService.mainCategory" :options="defaultMainCategory" clearable
          options-selected-class="text-deep-orange" class="bg-white q-mb-lg">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <img class="ggprofile-icon" alt="" :src="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-mb-lg">
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Sub Category<sup>*</sup>
        </div>
        <q-select outlined multiple v-model="updatedService.subCategory" :options="defaultSubCategory" clearable
          options-selected-class="text-deep-orange" class="bg-white q-mb-2xs">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <img class="ggprofile-icon" alt="" :src="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="row">
        <div class="q-mb-md col-6">
          <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
            Start Time
          </div>
          <q-input outlined v-model="updatedService.starttime" class="cursor-pointer" input-class="cursor-pointer"
            placeholder="Start Time" readonly>
            <q-popup-proxy ref="starttimeRef" transition-show="scale" transition-hide="scale">
              <q-time v-model="updatedService.starttime" color="primary"
                @update:model-value="() => $refs.starttimeRef.hide()" />
            </q-popup-proxy>
          </q-input>
        </div>
        <div class="q-mb-md col-6">
          <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
            End Time
          </div>
          <q-input outlined v-model="updatedService.endtime" class="cursor-pointer" input-class="cursor-pointer"
            placeholder="End Time" readonly>
            <q-popup-proxy ref="endtimeRef" transition-show="scale" transition-hide="scale">
              <q-time v-model="updatedService.endtime" color="primary"
                @update:model-value="() => $refs.endtimeRef.hide()" />
            </q-popup-proxy>
          </q-input>
        </div>
      </div>

      <div class="q-mb-lg">
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Phone Number
        </div>
        <q-input outlined placeholder="Phone number" v-model="updatedService.phone" type="tel" mask="### ### ####" />
      </div>

      <div class="q-mb-md">
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Address
        </div>
        <q-input outlined placeholder="" v-model="updatedService.address" />
      </div>
      <div class="row">
        <div class="q-mb-md col-7">
          <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
            City
          </div>
          <q-input outlined placeholder="City" v-model="updatedService.city" />
        </div>
        <div class="q-mb-md col-5">
          <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
            State
          </div>
          <q-input outlined placeholder="State" v-model="updatedService.state" />
        </div>

      </div>
      <div class="q-mb-md">
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Zip Code
        </div>
        <q-input outlined placeholder="Zip Code" mask="#####" v-model="updatedService.zipCode" />
      </div>
      <div>
        <div class="text-body2 text-weight-semibold text-grey-900 q-mb-2xs">
          Website
        </div>
        <q-input autocorrect="off" autocapitalize="off" outlined placeholder="https://example.com"
          v-model="updatedService.website" />
      </div>
      <div class="q-mt-xl">
        <AddImage @imageUpdate="onImageUpdate" :editMode="true" :editImages="editImages" />
      </div>
      <q-card flat class="col column no-wrap bg-transparent">
        <q-card-section class="col q-py-2xl q-px-md column no-wrap">
          <q-item class="no-padding suggestions q-mb-xs self-center">
            <q-item-section avatar>
              <q-icon name='ti-comments' color="grey-700" />
            </q-item-section>
            <q-item-section class="text-grey-700 text-weight-semibold">
              Reviews
            </q-item-section>
          </q-item>
          <q-item-section :key="reviewIndex" v-for="(review, reviewIndex) in updatedService.reviews">
            <div>
              <q-icon class="text-orange" name="star" :key="index" v-for="index in Math.floor(review.rating)" />
            </div>
            <q-item-label caption>{{ review.text }}</q-item-label>
          </q-item-section>
        </q-card-section>
      </q-card>
      <q-btn no-caps unelevated color="primary" text-color="white" label="Update service"
        class="text-weight-medium text-subtitle2 q-mt-lg full-width" :disable="!isProfileValid" type="submit" />
    </q-form>

    <q-dialog v-model="showCodeInput">
      <q-card class="bg-primary-400 q-ma-lg">
        <q-card-section>
          <div class="text-h6 text-white">Verify Code</div>
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <div>
            <v-otp-input ref="otpInput" class="otp-inputs-wrapper row no-wrap items-center q-gutter-x-xs font-libre"
              input-classes="otp-input full-width text-h5 text-primary text-center border border-grey-100"
              :num-inputs="6" :placeholder="['0', '0', '0', '0', '0', '0']" :is-input-num="true" separator=""
              @on-change="handleOnChangeOtp" @on-complete="handleOnCompleteOtp" />
            <div v-if="otpError" class="q-mt-md text-center text-body1 text-weight-semibold text-error-400">
              {{ otpError }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">

          <q-btn no-caps :ripple="false" :disable="!isOtpComplete" color="primary" text-color="white" label="Verify" @click="onVerifyCode" />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { setAppHeader } from '@utils/helpers/common';
import { useQuasar } from 'quasar';
import AddLocation from 'components/common/form/AddLocation.vue';
import AddImage from 'components/common/form/AddImage.vue';
import { useUserStore } from 'src/stores';
import { useObtainCameraPermissions } from 'src/utils/helpers/permission';
import { categoriesList } from 'src/utils/initials';
import { computed, ref, watch } from 'vue';
import { showPermissionDialog } from '@utils/helpers/common';
import { getMyService, sendSMSCode, verifyCodeAndSignIn } from '@utils/helpers/user';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog.vue';
import VOtpInput from 'vue3-otp-input';

setAppHeader({
  title: 'My Service',
  backNav: true
});

// Data
const $q = useQuasar();
const userStore = useUserStore();
const { updateUserService, uploadServiceAvatar, verificationId, reportResource } = userStore;

const updateProfileForm = ref(null);
const profilePic = ref(undefined);
const starttimeRef = ref(null);
const endtimeRef = ref(null);
const updatedService = ref({
  title: userStore.service?.title || '',
  phone: userStore.service?.phone || '',
  description: userStore.service?.description || '',
  starttime: userStore.service?.starttime || '',
  endtime: userStore.service?.endtime || '',
  address: userStore.service?.address || '',
  city: userStore.service?.city || '',
  state: userStore.service?.state || '',
  country: userStore.service?.country || '',
  zipCode: userStore.service?.zipCode || '',
  email: userStore.service?.email || '',
  mainCategory: userStore.service?.mainCategory || '',
  subCategory: userStore.service?.subCategory || [],
  placeId: userStore.service?.placeId || {},
  images: userStore.service?.images || [],
  reviews: userStore.service?.reviews || [],
  lat: userStore.service?.lat || 0,
  lng: userStore.service?.lng || 0,
  fromGoogle: userStore.service?.fromGoogle === undefined? true: userStore.service?.fromGoogle,
});
const otpInput = ref(null);
const isOtpComplete = ref(false);
const showCodeInput = ref(false);
const verificationCode = ref(null);
const otpError = ref(null);

const defaultMainCategory = computed(() => {
  return categoriesList;
});
const defaultSubCategory = computed(() => {
  return updatedService.value.mainCategory ? categoriesList.filter(el => el.value === updatedService.value.mainCategory.value)[0].subCategories : [];
});

// Computed property

const avatar = computed(() => userStore.service?.avatar);
const isProfileValid = computed(
  () => updatedService.value.title && updatedService.value.mainCategory && updatedService.value.description.length > 10
);

const editImages = computed(() => updatedService.value.images);
const editPlace = computed(() => ({ placeId: updatedService.value.placeId, coordinates: { lat: updatedService.value.lat, lng: updatedService.value.lng } }));

// Methods

async function onVerifyCode() {
  otpError.value = null;
  const verifyResult = await verifyCodeAndSignIn({
    verificationId: userStore.verificationId,
    verificationCode: verificationCode.value
  });
  if (!verifyResult.success) {
    otpError.value = 'Incorrect verification code! Please try again.';
    otpInput.value.clearInput();
    return;
  }
  showCodeInput.value = false;
  saveService();
}

watch(verificationCode, newValue => {
  if (!!newValue && newValue.length == 6) {
    isOtpComplete.value = true;
  } else {
    isOtpComplete.value = false;
  }
});

function handleOnChangeOtp(value) {
  verificationCode.value = value;
}
function handleOnCompleteOtp(value) {
  verificationCode.value = value;
}

function isValidName(e) {
  if (!/^[a-zA-Z\s]+$/.test(e.key)) {
    e.preventDefault();
  }
}

function onUpdateName(e, field) {
  updatedService.value[field] = e.replace(/[^a-zA-Z\s]+/g, '');
}

function onUpdateMainCategory(e) {
  updatedService.value.subCategory = []
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
      width: 300,
      height: 300
    });

    profilePic.value = cameraImage;
  } catch (err) {
    // in case user cancels
    console.error(err);
  }
}

async function onUpdateMyService() {
  const isValidForm = await updateProfileForm.value.validate();
  if (!isValidForm) {
    return;
  }

  console.log(updatedService.value)
  if (updatedService.value.placeId !== '' && updatedService.value.fromGoogle === true) {
    if (updatedService.value.phone !== '') {
      $q.dialog({
        component: ConfirmationDialog,
        componentProps: {
          theme: 'primary',
          icon: 'warning',
          primaryLabel: 'Yes, send sms',
          title: 'This is my service',
          message:
            `You are attempting to use a service registered by the system. You need to verify this phone number. ${updatedService.value.phone}`
        }
      }).onOk(async () => {
        verifyPhoneNumber()
      });
    } else {
      $q.dialog({
        component: ConfirmationDialog,
        componentProps: {
          theme: 'primary',
          icon: 'warning',
          primaryLabel: 'Yes, Correct',
          title: 'This is my service',
          message:
            `You are attempting to use a service registered by the system. It will be reviewed by Foodie team. Are you sure?`
        }
      }).onOk(async () => {
        const result = await reportResource('my-service', updatedService.value.placeId);

        if (result.alreadyExist) {
          // Notify user that this is already reported by him.
          return;
        }

        if (result.success) {
          $q.notify({
            type: 'primary',
            message: 'Service  asked!',
            caption: 'Thank you for submitting a Service.'
          });
        }
      });
    }

    return;
  }
  saveService();
}

async function verifyPhoneNumber() {

  // sendSMSCode(updatedService.value.phone)
  await sendSMSCode('6315728527')
  showCodeInput.value = true;
}
async function saveService() {

  const imagesCollection = [];

  if (updatedService.value.lat < 24.7433195 || updatedService.value.lat > 49.3457868 || updatedService.value.lng < -124.7844079 ||  updatedService.value.lng > -66.9513812) {
    $q.notify({
      type: 'error',
      message: 'Error!',
      caption: 'The service must be located in the United States.'
    });
    
    return;
  }
  let findGoogleImage = false
  for (const image of updatedService.value.images) {
    if (
      image.photo != undefined &&
      image.photo.path.startsWith('file:')
    ) {
      const base64 = await Filesystem.readFile({
        path: image.photo.path
      });
      imagesCollection.push(base64);
    } else {
      const imageUrl = image.photo?.path || image;
      if (!imageUrl.startsWith('https://')) {
        findGoogleImage = true;
        break;
      }
      imagesCollection.push({ isUrl: image.photo?.path || image });
    }
  }

  if (findGoogleImage) {

    $q.notify({
      type: 'error',
      message: 'Warning!',
      caption: 'You must upload your own photos instead of Google\'s suggestions.'
    });
    return;

  }
  const userData = updatedService.value;

  const profileImageDataUrl = profilePic.value?.dataUrl;

  if (profileImageDataUrl) {
    // profile image selected
    const uploadResult = await uploadServiceAvatar({
      dataUrl: profileImageDataUrl
    });

    if (!uploadResult.success) {
      return;
    }

    userData.avatar = uploadResult.data;
  }

  const updatedResult = await updateUserService({ data: userData, images: imagesCollection });
  if (!updatedResult.success) return;

  $q.notify({
    type: 'primary',
    message: 'Service Saved!',
    caption: 'Your service has been successfully updated.'
  });
  getMyService()
}
function onImageUpdate(images) {
  updatedService.value.images = images;
}

function onUpdatePlace(place) {
  const {
    address: { streetNumber, streetName, city, country, state, postalCode },
    title,
    website,
    phone
  } = place;
  console.log(place)

  let _phone = phone?.replace(/[^0-9]+/g, "") || ''
  _phone = _phone.length > 10 ? _phone.slice(1, 11) : _phone;
  updatedService.value.address = `${streetNumber || ''} ${streetName || ''}`;
  updatedService.value.city = city;
  updatedService.value.state = state;
  updatedService.value.country = country;
  updatedService.value.zipCode = postalCode;
  updatedService.value.phone = _phone
  updatedService.value.title = title;
  updatedService.value.website = website;
  updatedService.value.placeId = place.placeId;
  updatedService.value.lat = place.coordinates.lat;
  updatedService.value.lng = place.coordinates.lng;
  updatedService.value.endtime = place.endtime;
  updatedService.value.starttime = place.starttime;
  updatedService.value.reviews = place.reviews?.map(el => ({...el, text: el.text?.replace(/[^\x00-\x7F]/g, "")}));
  updatedService.value.rating = place.rating;
}

function onUpdateCoordinates(point) {
  console.log(point)
  updatedService.value.lat = point.lat;
  updatedService.value.lng = point.lng;
  updatedService.value.placeId = ''
  updatedService.value.phone = ''
  updatedService.value.website = ''
  updatedService.value.reviews = []
  updatedService.value.rating = 0
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

.verifyCode {
  background-color: $primary;
}
</style>
