import { defineStore } from 'pinia';
import { Loading, QSpinnerOrbit } from 'quasar';
import { httpsCallable } from 'firebase/functions';
import state from './state';
import { firebaseFunctions } from 'src/boot/firebase';

const useResourceStore = defineStore('resources', {
  state,
  actions: {
    async searchPlacesByText({ searchText }) {
      const result = {
        success: false,
        data: []
      };

      try {
        const getPlacesByText = httpsCallable(
          firebaseFunctions,
          'common-getPlacesByText'
        );
        Loading.show({spinner: QSpinnerOrbit});

        const response = await getPlacesByText({ searchText });
        const { data } = response;

        result.success = true;
        result.data = data;
      } catch (error) {
        console.error(error);
      } finally {
        Loading.hide();
        return result;
      }
    },

    async fetchPlaceDetailsById({ placeId }) {
      const result = {
        success: false,
        data: {}
      };

      try {
        Loading.show({spinner: QSpinnerOrbit});
        const getPlaceDetailsByPlaceId = httpsCallable(
          firebaseFunctions,
          'common-getPlaceDetailsByPlaceId'
        );
        const response = await getPlaceDetailsByPlaceId({ placeId });
        const { data } = response;

        result.success = true;
        result.data = data;
      } catch (error) {
        console.error(error);
      } finally {
        Loading.hide();
        return result;
      }
    }
  }
});

export default useResourceStore;
