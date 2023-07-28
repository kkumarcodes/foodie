<template>
  <q-dialog
    persistent
    ref="confirmDialogRef"
    @hide="onDialogHide"
    position="bottom"
    class="z-max"
  >
    <q-card class="q-mx-md q-mb-4xl rounded-borders-md text-center">
      <q-card-section class="q-px-md q-pt-lg q-pb-md">
        <div class="q-mb-md">
          <q-avatar
            class="relative-position"
            :color="`${theme}-100`"
            :text-color="`${theme}`"
            size="48px"
          >
            <q-icon :name="getIconName" />
            <div
              class="message-icon-border-item absolute-center bg-transparent border-8 rounded-borders-full"
              :class="[`border-${theme}-50`]"
            />
          </q-avatar>
        </div>
        <div class="text-grey-900 text-subtitle2 text-weight-medium q-mb-xs">
          {{ title }}
        </div>
        <div class="text-grey-500 text-body2 q-mb-xl">{{ message }}</div>
        <div class="column">
          <q-btn
            no-caps
            unelevated
            :ripple="false"
            :color="theme"
            text-color="white"
            padding="10px 16px"
            :label="primaryLabel"
            @click="onOkClick"
          />
          <q-btn
            no-caps
            flat
            :ripple="false"
            color="white"
            text-color="grey-700"
            padding="10px 16px"
            class="border border-grey-300 q-mt-sm"
            :label="secondaryLabel"
            @click="onCancelClick"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import { useDialogPluginComponent } from 'quasar';
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'ConfirmationDialog',
    props: {
      title: { type: String, required: true },
      message: {
        type: String,
        required: true
      },
      theme: { type: String, default: 'primary' },
      icon: { type: String },
      primaryLabel: { type: String, default: 'OK' },
      secondaryLabel: { type: String, default: 'Cancel' }
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
      const iconMap = {
        success: 'ti-check-box',
        warning: 'ti-info',
        error: 'ti-alert',
        trash: 'ti-trash'
      };
      const {
        dialogRef: confirmDialogRef,
        onDialogHide,
        onDialogOK,
        onDialogCancel
      } = useDialogPluginComponent();
      const getIconName = computed(() => {
        return iconMap[props.icon ? props.icon : props.theme];
      });
      return {
        confirmDialogRef,
        onDialogHide,
        onOkClick: onDialogOK,
        onCancelClick: onDialogCancel,
        getIconName
      };
    }
  });
</script>

<style lang="scss" scoped>
  .message-icon-border-item {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    box-sizing: content-box;
  }
</style>
