<template>
  <div>
    <q-card class="rounded-borders-md component-shadow">
      <q-item :clickable="images.length <= 0" @click="openImagePicker">
        <q-item-section avatar>
          <q-icon size="sm" color="primary-600" name="ti-image" />
        </q-item-section>
        <q-item-section>Add images</q-item-section>
        <q-item-section side>
          <q-icon v-if="images.length <= 0" size="sm" color="grey-500" name="ti-angle-right" class="cursor-pointer"
            @click.stop="openImagePicker" />
          <q-icon v-else size="sm" color="primary-600" name="ti-trash" class="cursor-pointer"
            @click.stop="removeSelectedImages" />
        </q-item-section>
      </q-item>
      <div v-if="images.length > 0" class="q-px-md q-pb-md row q-gutter-xs">
        <q-card flat v-for="(image, index) in images" :key="image.photo.path" @click="() => toggleSelectedImage(index)"
          class="rounded-borders-3xs image-card relative-position" :class="[image.selected ? 'selected-image' : '']">
          <q-img v-if="image.photo.webPath.startsWith('https://') || image.photo.webPath.startsWith('capacitor:')" :src="image.photo.webPath"
            :width="image.selected ? '48px' : '56px'" :height="image.selected ? '48px' : '56px'"
            :class="[image.selected ? 'rounded-borders-3xs' : '']" />
          <q-img v-if="!image.photo.webPath.startsWith('https://')"
            :src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${image.photo.webPath}&key=${process.env.GOOGLE_MAPS_API_KEY}`"
            :width="image.selected ? '48px' : '56px'" :height="image.selected ? '48px' : '56px'"
            :class="[image.selected ? 'rounded-borders-3xs' : '']" />
          <q-checkbox v-model="image.selected" class="absolute-top-right" v-if="image.selected" />
        </q-card>
        <q-card flat class="image-card border border-primary-100 row flex-center" v-if="images.length < 10"
          @click="openImagePicker">
          <q-icon name="ti-plus" color="primary-500" size="20px" />
        </q-card>
      </div>
    </q-card>
    <div class="q-mt-3xs text-grey-500 text-caption">Max 10 images</div>
  </div>
</template>

<script setup>
import { Camera } from '@capacitor/camera';
import { showPermissionDialog } from '@utils/helpers/common';
import { useQuasar } from 'quasar';
import { useObtainPhotosPermission } from 'src/utils/helpers/permission';
import { computed, onBeforeMount, ref } from 'vue';

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  editImages: {
    type: Array,
    default: () => []
  }
});

const $q = useQuasar();
const emit = defineEmits(['imageUpdate']);

const getImagesFromProps = computed(() => {
  return props.editImages.map(url => ({
    photo: {
      path: url,
      webPath: url
    },
    selected: false
  }));
});

const images = ref([]);

onBeforeMount(() => {
  images.value = getImagesFromProps.value;
});

async function openImagePicker() {
  const permissionsResult = await useObtainPhotosPermission();

  if (permissionsResult.permissionDenied && permissionsResult.showDialog) {
    showPermissionDialog('photos');
    return;
  }

  if (permissionsResult.permissionDenied && !permissionsResult.showDialog) {
    return;
  }

  try {
    const imagesLength = images.value.length;

    // [ pending] add loading state
    const result = await Camera.pickImages({
      quality: 100,
      limit: 10 - imagesLength,
      width: 1080,
      height: 1080
    });

    const { photos } = result;

    const maxPhotos = photos.slice(0, 10 - imagesLength).map(photo => ({
      photo,
      selected: false
    }));

    images.value = [...images.value, ...maxPhotos];

    emit('imageUpdate', images.value);
  } catch (error) {
    // incase user cancels
    console.error(error);
  } finally {
    // [TODO pending] stop loading state
  }
}

function toggleSelectedImage(index) {
  images.value.at(index).selected = !images.value.at(index).selected;
}

function removeSelectedImages() {
  if (images.value.findIndex(image => image.selected) > -1) {
    images.value = images.value.filter(image => !image.selected);
    return;
  }

  emit('imageUpdate', images.value);
}
</script>

<style lang="scss" scoped>
.image-card {
  width: 56px;
  height: 56px;
}

.selected-image {
  border: 4px solid #ccd1e6;
}

.q-checkbox {
  :deep(.q-checkbox__inner) {
    font-size: 30px;

    .q-checkbox__bg {
      border-radius: 6px !important;
      background: $primary-50;
      border: 1px solid $primary-600;
      width: 20px;
      height: 20px;
      top: 16.67%;
      left: 16.67%;
      transition: background 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms,
        border 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;

      .q-checkbox__svg {
        color: $primary-600;
        padding: 3px;
      }
    }
  }
}
</style>
