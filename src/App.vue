<template>
  <router-view />
</template>
<script setup>
import { Network } from '@capacitor/network';
import { useRoute, useRouter } from 'vue-router';
import { useCommonStore } from './stores';
import { onBeforeMount } from 'vue';
import { firebaseAuth } from './boot/firebase';
import { setProfileSnapshotSubscription } from './utils/helpers/user';
import { doc, getFirestore } from '@firebase/firestore';

const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();

if (!commonStore.networkStatusChangeListener) {
  const networkStatusChangeListener = Network.addListener(
    'networkStatusChange',
    onNetworkStatusChange
  );
  commonStore.$patch(state => {
    state.networkStatusChangeListener = networkStatusChangeListener;
  });
}

async function onNetworkStatusChange(status) {
  // INFO: to prevent listener firing multiple times on connected
  if (status.connected === commonStore.networkStatus?.connected) {
    return;
  }
  commonStore.$patch(state => {
    state.networkStatus = status;
  });

  if (!status.connected) {
    commonStore.$patch(state => {
      state.offlineRoute = {
        name: route.name,
        params: route.params
      };
    });

    router.replace({
      name: 'offline'
    });
  } else {
    const uid = firebaseAuth.currentUser?.uid;
    if (uid) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', uid);
      setProfileSnapshotSubscription({ uid, userDocRef });
    }

    if (
      !!commonStore.offlineRoute &&
      commonStore.offlineRoute?.name != 'offline'
    ) {
      router.replace(commonStore.offlineRoute);
    } else {
      router.replace({
        name: 'dashboard'
      });
    }
    commonStore.$patch(state => {
      state.offlineRoute = null;
    });
  }
}

onBeforeMount(async () => {
  const networkStatus = await Network.getStatus();
  commonStore.$patch(state => {
    state.networkStatus = networkStatus;
  });
  if (!networkStatus.connected) {
    router.replace({ name: 'offline' });
  }
});
</script>
