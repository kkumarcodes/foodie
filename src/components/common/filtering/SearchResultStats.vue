<template>
  <div class="row bg-accent text-body2 q-pa-md text-grey-900">
    <div class="col">
      <span class="text-weight-semibold">{{ count }} </span> Service{{
        count > 1 ? 's' : ''
      }}
      found
    </div>
    <q-btn
      v-if="showFilter"
      no-caps
      :ripple="false"
      unelevated
      padding="0"
      @click="filterClicked"
      class="text-body2"
    >
      <img class="ggprofile-icon" alt="" :src="'/filter.svg'"/>
      <div class="q-ml-xs">Filter</div>
    </q-btn>
    <q-btn
      v-if="showSort"
      no-caps
      :ripple="false"
      unelevated
      padding="0"
      @click="sortClicked"
      class="text-body2"
    >
      <q-icon name="ti-arrows-vertical" size="16px" color="grey-900" class="sort-icon" />
      <div class="q-ml-xs">Sort</div>
    </q-btn>
  </div>
</template>

<script setup>

  defineProps({
    count: {
      type: Number,
      required: true,
      default: 0
    },
    showSort: {
      type: Boolean,
      default: false
    },
    showFilter: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['onFilterClicked', 'onSortClicked']);

  function filterClicked() {
    emit('onFilterClicked');
  }

  function sortClicked() {
    emit('onSortClicked');
  }
</script>

<style>
  .sort-icon {
    transform: rotate(90deg);
  }
</style>
