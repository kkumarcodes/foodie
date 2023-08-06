import { defineStore } from 'pinia';
import state from './state';
import { appHeaderConfigInit } from '@utils/placeholders';

const useCommonStore = defineStore('common', {
  state,
  actions: {
    resetAppHeaderConfig() {
      this.appHeaderConfig = { ...appHeaderConfigInit() };
    },
    setAppHeaderConfig(config) {
      this.appHeaderConfig = { ...this.appHeaderConfig, ...config };
    }
  }
});

export default useCommonStore;
