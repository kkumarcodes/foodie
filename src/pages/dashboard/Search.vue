<template>
  <q-page class="column no-wrap">
    <div class="q-pa-md">
      <SNSearchInput placeholder="Search Services" v-model="searchText" @keyup.enter="onSearch"
        @onFilter="onFilterClicked" />
    </div>
    <div class="col column no-wrap">
      <div v-if="searchedResults.length > 0" class="q-px-md q-pt-md q-pb-5xl q-mb-md">
        <div class="row items-start justify-between content-start q-gutter-md">
          <q-card class="my-card" v-for="(search, index) in searchedResults" :key="index" clickable>
            <q-item clickable @click.stop="gotoDetails(search.id)">
              <q-item-section avatar v-if="search.avatar">
                <q-avatar square size="70px">
                  <img :src="search.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section avatar v-if="!search.avatar && search.images?.length > 0">
                <q-avatar square size="70px">
                  <img v-if="!search.images[0].startsWith('https://')" class="avatar-image" :src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${search.images[0]}&key=${process.env.GOOGLE_MAPS_API_KEY}`">
                  <img v-if="search.images[0].startsWith('https://')" class="avatar-image" :src="search.images[0]">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ search.title }}</q-item-label>
                <q-item-label lines="3" caption>{{ search.description || `${search.address}, ${search.city}, ${search.state} ${search.zipCode}`}}</q-item-label>
                <q-item-label caption lines="1" v-if="search.website">{{ search.website }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{ (search.distance/1000).toFixed(2) }}km</q-item-label>
                <div v-if="!search.fromGoogle && search.reviews && search.reviews?.length > 0">
                  <q-icon class="text-orange" name="star" :key="index"
                    v-for="index in Math.round(search.reviews.reduce((accumulator, object) => { return accumulator + object.rating }, 0) / search.reviews.length)" />
                  ({{ reviewsFormatString(search.reviews?.length) }})
                </div>
                <div v-if="search.rating > 0 && search.fromGoogle">
                  <q-icon class="text-primary" name="star" :key="index"
                    v-for="index in Math.round(search.rating)" />
                </div>
                <q-item-label caption v-if="search.starttime !== ''">{{ search.starttime }} - {{ search.endtime
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div v-else class="col column flex-center q-pa-md">
        <q-img src="~/assets/common/search-not-found.svg" width="157px" />
        <div class="text-grey-500 text-body2 text-center q-mt-xl">
          There are no services present
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import FilterDialog from 'src/components/common/filtering/FilterDialog.vue';
import SNSearchInput from 'src/components/common/input/SNSearchInput.vue';
import { setAppHeader, reviewsFormatString } from 'src/utils/helpers/common';
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useDashboardStore, useUserStore, useServiceStore } from '@stores';
import { storeToRefs } from 'pinia';
import { trim } from 'lodash';
import { getLocationPermission } from '@utils/helpers/permission';
import { categoriesList } from '@utils/initials';

setAppHeader({});

const router = useRouter();
const $q = useQuasar();
const dashboardStore = useDashboardStore();
const userStore = useUserStore();
const serviceStore = useServiceStore();

const { searchedResults, searchText } =
  storeToRefs(dashboardStore);
const { searchServices } = dashboardStore;
const { updateUserProfile } = userStore;

const lastSearch = ref(null);

const resultsMode = ref(false);

const sortBy = ref('newToOld');
const byCategory = ref(categoriesList.map(el => el.value));

const emit = defineEmits(['onCategoryClicked', 'onSuggestClicked']);

const recentSearches = computed(
  () => userStore.profile?.recentSearches || []
);

function onFilterClicked() {
  $q.dialog({
    component: FilterDialog,
    componentProps: {
      filterTypes: ['sort', 'category'],
      sortBy: sortBy.value,
      byCategory: byCategory.value
    }
  }).onOk(payload => {
    sortBy.value = payload.sortBy;
    byCategory.value = payload.categories;
    onSearch()
  });
}

async function onSearch() {

  if (searchText.value !== '')
    addToRecentSearch(searchText.value);

  resultsMode.value = true;
  const payload = { searchText: searchText.value || '', mainCategory: byCategory.value };

  const searchResult = await searchServices(payload);
  if (!searchResult.success) {
    dashboardStore.$patch({ searchedResults: [] });
    return;
  }
  if (searchText.value !== '')
    lastSearch.value = searchText.value;

  console.log(searchResult.data, '===searchResult.data==')
  dashboardStore.$patch({ searchedResults: searchResult.data });
}

function onReset() {
  resultsMode.value = false;
  searchText.value = '';
  lastSearch.value = null;
  dashboardStore.$patch({
    searchedResults: [],
    categoryResults: [],
  });
}

function gotoDetails(id) {
  serviceStore.$patch({
    service: {}
  })
  router.push({
    name: 'service-details',
    params: { id }
  })
}

async function addToRecentSearch(search) {
  const recentSearches = userStore.profile?.recentSearches || [];
  const recentSearchesInsensitive = recentSearches.map(recent =>
    recent.toLowerCase()
  );

  if (
    !search ||
    trim(search)?.length == 0 ||
    recentSearchesInsensitive.includes(trim(search).toLowerCase())
  ) {
    return;
  }

  recentSearches.unshift(trim(search));

  if (recentSearches.length > 3) {
    recentSearches.pop();
  }

  const updatedResult = await updateUserProfile({
    data: {
      recentSearches: recentSearches
    }
  });

  if (!updatedResult.success) return;

  userStore.$patch(state => {
    state.profile.recentSearches = recentSearches;
  });
}

function onRecentSearchClick(search) {
  searchText.value = search;
  onSearch();
}

async function clearRecentSearches() {
  const updatedResult = await updateUserProfile({
    data: {
      recentSearches: []
    }
  });

  if (!updatedResult.success) return;

  userStore.$patch(state => {
    state.profile.recentSearches = [];
  });
}

onBeforeMount(() => {
  getLocationPermission();
  if (searchedResults.value.length === 0) {
    console.log(searchedResults.value.length, '==searchedResults.length==')

    onSearch();
  }
    
});
</script>
<style lang="scss" scoped>

.my-card {
  width: 100%;
}

.avatar-image {
  object-fit: cover;
}
</style>