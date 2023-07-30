<template>
  <q-carousel
    v-model="slide"
    infinite
    swipeable
    height="230px"
    animated
    transition-next="slide-left"
    transition-prev="slide-right"
    transition-duration="300"
    navigation
    navigation-position="top"
    ref="carousel"
  >
    <q-carousel-slide
      v-for="photo in carouselImages"
      :key="photo.url"
      :name="photo.url"
      :img-src="photo.url"
      :draggable="false"
    />

    <template #navigation-icon="{ index, active }">
      <div class="row full-width justify-end" v-if="active">
        <q-btn
          unelevated
          color="white"
          text-color="grey-900"
          class="carousel-navigation text-body2 text-weight-medium rounded-borders-md no-margin"
          disable
          padding="4px 8px 4px 8px"
        >
          <q-icon name="ti-camera" />
          <div class="q-ml-3xs">
            {{ index + 1 }}/{{ carouselImages.length }}
          </div>
        </q-btn>
      </div>
    </template>
  </q-carousel>
</template>

<script setup>
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    carouselImages: {
      type: Array,
      default: () => []
    }
  });

  const slide = ref(props.carouselImages.at(0).url || '');

  // [TODO] check swipe on mobile

  onMounted(() => {
    props.carouselImages.forEach(image => {
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
  });
</script>

<style lang="scss" scoped>
  .q-carousel__navigation {
    .q-btn {
      &.disabled {
        opacity: 1 !important;
      }
      .q-icon {
        font-size: 0.86em;
      }
    }
  }
</style>
