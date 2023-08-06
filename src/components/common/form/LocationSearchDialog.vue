<template>
  <q-dialog ref="locationSearchDialogRef" @hide="onDialogHide" maximized>
    <q-layout view="hHh lpr fFf" class="bg-light">
      <q-header class="q-pa-md" :class="[isAskLocation ? 'bg-accent ' : '']">
        <q-toolbar
          class="row flex-center"
          :class="[isAskLocation ? 'text-grey-900' : '']"
        >
          <div
            class="absolute-left cursor-pointer row flex-center"
            @click="onDialogCancel"
          >
            <q-icon size="20px" name="ti-angle-left" />
          </div>
          <div class="text-weight-medium text-body2">Add Location</div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="column q-pa-md">
          <div>
            <SNSearchInput
              v-model="searchText"
              placeholder="Search"
              debounce="1000"
              :autofocus="true"
            />
          </div>
          <div class="col q-mt-xs column">
            <div class="col" v-if="searchResults.length > 0">
              <q-list separator>
                <template
                  v-for="location in searchResults"
                  :key="location.placeId"
                >
                  <q-item
                    class="q-px-none"
                    clickable
                    @click="() => handleSelectLocation(location.placeId)"
                  >
                    <q-item-section class="text-grey-700 text-body2">
                      <q-item-label>
                        {{ location.name }}
                      </q-item-label>
                      <q-item-label caption lines="2">
                        {{ location.formattedAddress }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </div>
            <div
              class="col column flex-center"
              v-else-if="searchText && searchResults.length <= 0"
            >
              No locations found
            </div>
            <div class="col" v-else-if="recentSearches.length > 0">
              <div class="row q-pt-sm justify-between">
                <div class="text-body2 text-weight-semibold">
                  Recent locations
                </div>
                <div class="text-primary text-body2" @click="clearRecent">
                  Clear
                </div>
              </div>
              <q-list separator>
                <q-item
                  v-for="(search, index) in recentSearches"
                  :key="index"
                  clickable
                  class="q-px-none"
                  @click="onRecentSearchClick(search)"
                >
                  <q-item-section avatar>
                    <q-icon color="grey-500" size="xs" name="ti-search" />
                  </q-item-section>

                  <q-item-section class="text-body2 text-grey-700">
                    {{ search }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col column flex-center" v-else>
              Please search for a location
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup>
  import { useResourceStore } from '@stores';
  import { useDialogPluginComponent } from 'quasar';
  import { useUserStore } from 'src/stores';
  import { ref, watchEffect, computed } from 'vue';
  import SNSearchInput from '../input/SNSearchInput.vue';

  const userStore = useUserStore();
  const { updateUserProfile } = userStore;

  const props = defineProps({
    isAskLocation: {
      type: Boolean,
      default: false
    }
  });

  const {
    dialogRef: locationSearchDialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel
  } = useDialogPluginComponent();
  const searchText = ref('');
  const searchResults = ref([]);
  const recentSearches = computed(() => userStore.profile?.recentPlaces?.filter(el => el !== '') || []);
  const resourceStore = useResourceStore();
  const { searchPlacesByText, fetchPlaceDetailsById } = resourceStore;

  watchEffect(async () => {
    if (!searchText.value) {
      searchResults.value = [];
      return;
    }

    const searchString = searchText.value.replaceAll(',', '');

    const result = await searchPlacesByText({
      searchText: searchString.replaceAll(' ', '')
    });

    if (!result.success) {
      searchResults.value = [];
      return;
    }

    searchResults.value = result.data;
  });

  // Emits
  defineEmits([...useDialogPluginComponent.emits]);

  // Methods
  async function handleSelectLocation(placeId) {
    const result = await fetchPlaceDetailsById({ placeId });

    if (!result.success) {
      // [TODO pending] show error on fetch
      return;
    }

    const { place } = result.data;
    addToRecentPlace(place.name);

    onDialogOK({ place });
  }

  async function addToRecentPlace(name) {
    const recentPlaces = userStore.profile?.recentPlaces || [];

    if (recentPlaces.includes(name)) {
      return;
    }

    recentPlaces.unshift(name);

    if (recentPlaces.length > 5) {
      recentPlaces.pop();
    }

    const updatedResult = await updateUserProfile({
      data: {
        recentPlaces: recentPlaces
      }
    });

    if (!updatedResult.success) return;

    userStore.$patch(state => {
      state.profile.recentPlaces = recentPlaces;
    });
  }

  function onRecentSearchClick(search) {
    searchText.value = search;
  }

  async function clearRecent() {
    const updatedResult = await updateUserProfile({
      data: {
        recentPlaces: []
      }
    });

    if (!updatedResult.success) return;
    userStore.$patch(state => {
      state.profile.recentPlaces = [];
    });
  }
</script>
