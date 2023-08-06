<template>
  <q-page class="row">
    <div class="col text-center self-center q-mx-2xl q-px-lg">
      <div class="text-subtitle2 q-mt-xl text-grey-900 text-weight-medium">
        You are offline
      </div>
      <div class="text-body1 text-grey-500 q-mt-xs">
        Currently you're offline, connect to your internet
      </div>

      <q-btn
        no-caps
        flat
        class="bg-primary q-py-xs q-mt-xl full-width"
        color="white"
        label="Try again"
        @click="checkConnectionStatus"
      ></q-btn>
    </div>
  </q-page>
</template>

<script setup>
  import { Network } from '@capacitor/network';
  import { setAppHeader } from 'src/utils/helpers/common';

  setAppHeader({});

  async function checkConnectionStatus() {
    await Network.getStatus();
  }
</script>
