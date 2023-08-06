<template>
  <div class="full-width bg-white" :class="[
    appHeaderConfig.class,
    !appHeaderConfig.title ? 'app-header' : 'app-header1'
  ]" v-if="appHeaderConfig.title ||
  appHeaderConfig.titleImg ||
  appHeaderConfig.backNav
  ">
    <div class="row flex-center">
      <div v-if="appHeaderConfig.backNav" class="cursor-pointer absolute-left q-pa-md" @click="handleBackNav">
        <q-icon color="grey-900" name='ti-angle-left' class="q-pa-md" />
      </div>
      <div class="col flex flex-center text-center text-body2 text-weight-medium q-pt-sm">
        <img v-if="appHeaderConfig.titleImg" :src="appHeaderConfig.titleImg" height="16" />
        <div class="text-grey-900" v-else>{{ appHeaderConfig.title }}</div>
      </div>
      <div v-if="appHeaderConfig.sideLabel || appHeaderConfig.sideIcon"
        class="text-grey-900 text-weight-medium flex-center flex aline-center cursor-pointer absolute-right q-pa-md"
        @click="appHeaderConfig.sideAction">
        <q-icon color="grey-900" :name="appHeaderConfig.sideIcon" size="20px" v-if="appHeaderConfig.sideIcon" class="q-pa-md" />
        <div class="q-mt-sm" v-else>{{ appHeaderConfig.sideLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonStore } from '@stores';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const $router = useRouter();
    const commonStore = useCommonStore();
    const { appHeaderConfig } = storeToRefs(commonStore);
    function handleBackNav() {
      if (!appHeaderConfig.value.backNavAction) {
        $router.go(-1);
        return;
      }
      appHeaderConfig.value.backNavAction();
    }
    return { appHeaderConfig, handleBackNav };
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  height: 52px;
}

.app-header1 {
  height: 52px;
  align-items: center;
  justify-content: center;
}
</style>
