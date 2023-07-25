<template>
  <q-page class="column no-wrap bg-service-detail q-pb-5xl">
    <q-card flat class="bg-service-card rounded-borders-none">
      <q-card-section class="q-px-xl q-py-xl">
        <CategoryChip :icon="categoryMap.icon" :label="categoryMap.label" v-if="categoryMap.label" />

        <q-item class="location text-grey-900 text-body1">
          <q-item-section class="text-body2">
            <div class="q-mt-md text-grey-900 text-subtitl1 text-weight-semibold">
              {{ title }}
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round padding="4px" color="grey-900">
              <q-icon name="more_vert" size="24px" />
              <q-menu cover anchor="bottom middle" class="text-body2 text-grey-700 card-shadow">
                <q-list style="min-width: 125px">
                  <q-item clickable v-close-popup @click.stop="reportService">
                    <q-item-section class="text-error-600">
                      Report Service
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>

        <q-item class="location text-grey-900 text-body1">
          <q-item-section avatar>
            <q-icon size="20px" :name="'ti-location-pin'" />
          </q-item-section>
          <q-item-section class="text-body2">
            <div class="row no-wrap">
              <div class="col">{{ shortLocation }}</div>
            </div>
          </q-item-section>

        </q-item>
        <div class="contact-container">
          <div>
            <q-icon size="40px" :name="'call'" />
          </div>
          <div>
            <q-icon size="40px" :name="'public'" />
          </div>
          <div>
            <q-icon size="40px" :name="'map'" />
          </div>
        </div>
        <GMapMap :center="coordinate" :zoom="17" map-type-id="terrain" class="map-container rounded-borders-md q-mt-xl"
          style="height: 400px">
          <GMapMarker :position="coordinate" />
        </GMapMap>

        <div class="q-mt-xl text-grey-900 text-body2">
          <span v-html="htmlDescription"></span>
        </div>
        <ServiceCarousel :carouselImages="carouselImages" v-if="carouselImages.length > 0" class="q-mt-xl q-mb-xl" />
      </q-card-section>

    </q-card>
    <q-card flat class="col column no-wrap bg-transparent">
      <q-card-section class="col q-py-2xl q-px-md column no-wrap">
        <q-item class="no-padding suggestions q-mb-xs self-center">
          <q-item-section avatar>
            <q-icon name='ti-comments' color="grey-700" />
          </q-item-section>
          <q-item-section class="text-grey-700 text-weight-semibold">
            Reviews ({{ reviewsCount }})
          </q-item-section>
        </q-item>
        <q-item-section :key="reviewIndex" v-for="(review, reviewIndex) in reviews">
          <div>
            <q-icon class="text-orange" name="star" :key="index" v-for="index in Math.floor(review.rating)" />
          </div>
          <q-item-label caption>{{ review.text }}</q-item-label>
        </q-item-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import ServiceCarousel from 'components/service/ServiceCarousel.vue';
import CategoryChip from 'components/common/CategoryChip.vue';
import { useQuasar } from 'quasar';
import ConfirmationDialog from 'src/components/common/ConfirmationDialog.vue';
import { useServiceStore, useUserStore } from 'src/stores';
import { setAppHeader } from 'src/utils/helpers/common';
import { categoriesList } from 'src/utils/initials';
import { computed, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import sanitizeHtml from 'sanitize-html';
import { storeToRefs } from 'pinia';
import isURL from 'validator/lib/isURL';
import { hasProtocol } from 'src/utils/validations';

setAppHeader({
  title: 'Service',
  backNav: true
});

const route = useRoute();
const router = useRouter();
const serviceStore = useServiceStore();
const userStore = useUserStore();

const { getServiceDetails } = serviceStore;
const { reportResource } = userStore;
const { service } =
  storeToRefs(serviceStore);

const $q = useQuasar();
getServiceDetails(route.params.id);

const categoryMap = computed(
  () =>
    categoriesList.find(category => category.value === service.value.mainCategory) ||
    {}
);
const title = computed(() => service.value.title || '');
const description = computed(() => service.value.description || '');
const coordinate = computed(() => ({ lat: service.value.lat || 0, lng: service.value.lng || 0 }));
console.log(coordinate, '==coordinate==')
const carouselImages = computed(
  () =>
    service.value.images?.map((image, index) => ({
      url: image?.startsWith('https://') ? image : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${image}&key=AIzaSyC13uUcy_Ve3Q93F_bEJT0-7is4uNgI47Y`,
      index
    })) || []
);

const shortLocation = computed(() => {
  const line1 = `${service.value?.address || ''}`;
  const city = `${service.value?.city || ''}`;
  const state = `${service.value?.state || ''}`;
  const zipCode = `${service.value?.zipCode || ''}`;

  const finalLocation = [line1, city, state, zipCode];

  return finalLocation.join(', ');
});

const reviewsCount = computed(() => service.value.reviews?.length || 0);

const reviews = computed(() => service.value.reviews?.slice(0, 10) || []);

const htmlDescription = computed(() => {
  const sanitized = sanitizeHtml(description.value);
  return sanitized
    .split(' ')
    .map(val => {
      // check of new line character
      if (val.indexOf('\n') > -1) {
        return val
          .split('\n')
          .map(val => {
            return isURL(val)
              ? `<a href="${hasProtocol(val) ? val : 'http://' + val
              }" class="text-primary-600">${val}</a>`
              : val;
          })
          .join('\n');
      } else {
        return isURL(val)
          ? `<a href="${hasProtocol(val) ? val : 'http://' + val
          }" class="text-primary-600">${val}</a>`
          : val;
      }
    })
    .join(' ');
});

function reportService() {
  $q.dialog({
    component: ConfirmationDialog,
    componentProps: {
      theme: 'error',
      primaryLabel: 'Yes, Report',
      title: 'Report',
      message:
        'You are about to report this Service. It will be reviewed by ServeMeNow team. Are you sure?'
    }
  }).onOk(async () => {
    const result = await reportResource('service', route.params.id);

    if (result.alreadyExist) {
      // Notify user that this is already reported by him.
      return;
    }

    if (result.success) {
      $q.notify({
        type: 'primary',
        message: 'Service  Reported!',
        caption: 'Thank you for submitting a Report.'
      });
    }
  });
}

onBeforeUnmount(() => {
  serviceStore.$patch({ service: {} });
});
</script>
<style lang="scss" scoped>
  .contact-container {
    display: flex;
    justify-content: space-around;
    color: $primary;
  }
</style>
