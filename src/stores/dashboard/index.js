import { defineStore } from 'pinia';
import { Loading, QSpinnerOrbit } from 'quasar';
import state from './state';
import { httpsCallable } from 'firebase/functions';
import { firebaseFunctions } from 'boot/firebase';
import { Geolocation } from '@capacitor/geolocation';

const radiusInM = 300000;

const useDashboardStore = defineStore('dashboard', {
  state,
  actions: {
    async getDashboardFeed(payload = {}) {
      const result = {
        success: false
      };

      const {
        filters: { categories = [], newestFirst = true, type = 'all' } = {},
        pagination: { page = 1, perPage = 20 } = {}
      } = payload;

      try {
        if (page === 1) {
          Loading.show({spinner: QSpinnerOrbit});
        }
        const getFeed = httpsCallable(firebaseFunctions, 'dashboard-getFeed');
        const response = await getFeed({
          filters: { categories, newestFirst, type },
          pagination: { page, perPage }
        });
        const {
          data: { recentAsks, newFeed, limitFeed, pagination }
        } = response;
        this.$patch(state => {
          state.feed.recentAsks = recentAsks;
          let { activity } = state.feed;
          if (page === 1) activity = [];

          if (newFeed && newFeed.length) {
            activity.unshift(...newFeed);
          }
          if (limitFeed && limitFeed.length) {
            activity.push(...limitFeed);
          }
          state.feed.activity = activity;
          state.feed.pagination = pagination;
        });
        result.success = true;
      } catch (err) {
        console.error(err);
      } finally {
        Loading.hide();
        return result;
      }
    },

    async searchServices(payload = {}) {
      Loading.show({spinner: QSpinnerOrbit});
      const result = {
        success: false
      };

      try {
        const coordinates = await Geolocation.getCurrentPosition();

        const searchServices = httpsCallable(
          firebaseFunctions,
          'service-searchServices'
        );

        const data = {
          searchText: payload.searchText,
          // lng: coordinates.coords.longitude,
          // lat: coordinates.coords.latitude,
          "lng": -76.9326672,
          "lat": 39.3967056,
          mainCategory: payload.mainCategory,
          radius: payload.radius || radiusInM
        }

        if (payload.searchText === '') {
          delete data["searchText"]
        }

        if (payload.mainCategory === null || payload.mainCategory === undefined) {
          delete data["mainCategory"]
        }
        const response = await searchServices(data);

        result.success = true;
        result.data = response.data;
      } catch (err) {
        console.error(err);
      } finally {
        Loading.hide();
        return result;
      }
    }
  }
});

export default useDashboardStore;
