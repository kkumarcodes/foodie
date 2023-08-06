<template>
  <q-chip color="primary-50" text-color="primary-700">
    <q-img :src="icon" :ratio="1" width="16px" />
    <div
      class="ellipsis q-ml-3xs text-primary-700 text-body2 text-weight-medium"
    >
      {{ label }}
    </div>
  </q-chip>
</template>

<script setup>
  defineProps({
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .q-chip {
    margin: 0;
    padding: 4px 10px;
  }
</style>
