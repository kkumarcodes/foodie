<template>
  <q-radio v-model="radioValue" v-bind="$attrs" />
</template>

<script setup>
  import { computed } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const radioValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
</script>

<style lang="scss" scoped>
  .q-radio {
    :deep(.q-radio__inner) {
      font-size: 20px;

      &.q-radio__inner--truthy {
        .q-radio__bg {
          background-color: $primary-50;
          color: $primary;
          border-radius: 100%;
        }
      }

      .q-radio__bg {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: $grey-300;
      }
    }
  }
</style>
