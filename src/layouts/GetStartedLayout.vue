<template>
  <q-layout view="hHh lpr fff" class="bg-white text-white">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, onBeforeMount } from 'vue';
  import { setStatusBarColor } from '@utils/helpers/common';

  export default defineComponent({
    name: 'GetStartedLayout',
    components: { },
    setup() {
      onBeforeMount(() => {
        setStatusBarColor('primary-700');
      });
      return {};
    }
  });
</script>
