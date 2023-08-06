import { firebaseFunctions } from 'boot/firebase';
import { defineStore } from 'pinia';
import { Loading, QSpinnerOrbit } from 'quasar';
import { httpsCallable } from 'firebase/functions';
import state from './state';

const useServiceStore = defineStore('services', {
  state,
  actions: {
    async getServiceDetails(serviceId) {
      const result = { success: false };
      Loading.show({spinner: QSpinnerOrbit});
      try {
        const getServiceByIdAPI = httpsCallable(
          firebaseFunctions,
          'service-getServiceById'
        );
        const data = {
          id: serviceId,
        }

        const response = await getServiceByIdAPI(data);

        this.service = response.data

        result.success = true;
      } catch (error) {
        console.error(error);
      } finally {
        Loading.hide();
        return result;
      }
    },
  }
});

export default useServiceStore;
