<template>
  <q-input v-model.trim="searchText" :autofocus="autofocus" outlined :placeholder="placeholder" class="search-input"
    :debounce="debounce">
    <template #prepend>
      <q-icon name="ti-search" size="20px" />
    </template>
    <template #append>
      <q-icon name="ti-close" size="16px" v-if="searchText" @click.stop="clearInput" />
    </template>
    <template v-slot:after>
      <img class="ggprofile-icon"  @click="emits('onFilter')" alt="" :src="'/filter.svg'"/>
    </template>
  </q-input>
</template>

<script setup>
import { computed, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    required: true
  },
  debounce: {
    type: String,
    default: '0'
  }
});

const emits = defineEmits(['update:modelValue', 'onFilter']);

const searchText = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

async function clearInput() {
  searchText.value = '';
}

function filterClicked() {
  emits('onFilterClicked')
}
</script>

<style lang="scss" scoped>
.q-input.q-field--outlined.search-input {
  &.q-field--focused {
    :deep(.q-field__control) {
      color: $primary-300;
    }

    :deep(.q-field__prepend) {
      color: $primary;
    }
  }

  :deep(.q-field__control) {
    padding: 0 14px;
    height: 44px;
    background: white;
    border-radius: 22px;
    box-shadow: 0px 1px 2px 0px rgba($grey-900, 0.1);

    .q-field__prepend {
      height: 44px;
    }

    .q-field__append {
      height: 44px;
    }
  }
}
</style>
