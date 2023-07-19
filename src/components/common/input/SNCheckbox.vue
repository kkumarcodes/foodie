<template>
  <q-checkbox
    v-model="checkedValue"
    :class="[
      checkedValue ? 'checkbox-complete-border' : 'checkbox-incomplete-border'
    ]"
  />
</template>

<script setup>
  import { computed } from 'vue';
  const props = defineProps({
    checked: {
      type: Boolean,
      required: true
    }
  });

  const emits = defineEmits(['update:checked']);

  const checkedValue = computed({
    get() {
      return props.checked;
    },
    set(value) {
      emits('update:checked', value);
    }
  });
</script>

<style lang="scss" scoped>
  .q-checkbox {
    :deep(.q-checkbox__inner) {
      font-size: 20px;
      &.q-checkbox__inner--truthy {
        color: $primary-50;

        .q-checkbox__svg {
          color: $primary;
        }
      }
      .q-checkbox__bg {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 6px !important;
        transition: background 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms,
          border 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;

        .q-checkbox__svg {
          padding: 3px;
        }
      }
    }
  }

  .checkbox-incomplete-border :deep(.q-checkbox__bg) {
    border: 1px solid $grey-500 !important;
  }

  .checkbox-complete-border :deep(.q-checkbox__bg) {
    border: 1px solid $primary !important;
  }
</style>
