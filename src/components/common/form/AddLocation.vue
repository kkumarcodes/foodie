<template>
  <q-card class="rounded-borders-md component-shadow">
    <q-item v-if="props.editMode">
      <q-item-section avatar>
        <q-icon size="sm" color="primary-600" name="ti-location-pin" />
      </q-item-section>
      <q-item-section @click="selectLocation"> Add Location </q-item-section>
      <q-item-section side>
        <q-icon v-if="addressExists" size="sm" color="primary-600" name="ti-close" @click="resetAddress" />
      </q-item-section>
    </q-item>
    <q-card-section :class="[
      addLocation && !addressExists ? 'q-pt-xs' : 'q-pt-xs q-pb-md q-px-md'
    ]" v-if="addressExists || !props.editMode">
      <div class="text-grey-700">
        <GMapMap @click="markerChanged" :center="center" :zoom="17" map-type-id="terrain"
          class="map-container rounded-borders-md" style="height: 280px">
          <GMapMarker :position="coordinate" />
        </GMapMap>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import LocationSearchDialog from 'components/common/form/LocationSearchDialog.vue';
import { useQuasar } from 'quasar';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

// Props
const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  editPlace: {
    type: Object,
    default: () => { }
  }
});

// Data
const addLocation = ref(false);
const displayAddress = ref({});
const center = ref({});
const $q = useQuasar();
const route = useRoute();

// Computed properties
const addressExists = computed(() => {
  return Object.keys(displayAddress.value).length > 0;
});

const coordinate = computed(() => displayAddress.value.coordinates || { lat: 0, lng: 0 });
const directions = computed(
  () =>
    displayAddress.value.placeId !== ''
);

// Emits
const emit = defineEmits(['updatePlace', 'updateCoordinates']);

onBeforeMount(() => {
  addLocation.value = true;
  displayAddress.value = props.editPlace
  center.value = props.editPlace.coordinates || { lat: 0, lng: 0 };
});

// Methods
function selectLocation() {
  $q.dialog({
    component: LocationSearchDialog,
    componentProps: {
      isAskLocation: route.name === 'create-ask' || route.name === 'edit-ask'
    }
  }).onOk(({ place }) => {
    updateAddress(place);
  });
}

function updateAddress(place) {
  emit('updatePlace', place);
  addLocation.value = false;
  displayAddress.value.placeId = place.placeId
  displayAddress.value.coordinates = place.coordinates
  center.value = place.coordinates;
}

function resetAddress() {
  addLocation.value = true;
  displayAddress.value = {};
  emit('updatePlace', undefined);
}

function markerChanged(payload) {
  if (props.editMode) {
    displayAddress.value.coordinates = { lat: payload.latLng.lat(), lng: payload.latLng.lng() }
    emit('updateCoordinates', displayAddress.value.coordinates);
  }

}

</script>

<style lang="scss" scoped>
.place-container {
  position: relative;
  top: -28px;
  height: 39px;
}
</style>
