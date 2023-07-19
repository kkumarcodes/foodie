<template>
  <q-dialog
    ref="filterDialogRef"
    @hide="onDialogHide"
    class="z-max"
    maximized
  >
    <q-layout view="hhh lpr fff">
      <q-header class="bg-primary q-pa-md">
        <q-toolbar class="row flex-center bg-primary">
          <div
            class="cursor-pointer absolute-left row flex-center"
            @click="onDialogCancel"
          >
            <q-icon color="white" name='ti-angle-left' class="q-pr-md" />
          </div>
          <div class="text-body2 text-weight-medium">Filter</div>
          <div class="row flex-center absolute-right">
            <q-btn
              no-caps
              flat
              label="Reset"
              @click="resetFilters"
              class="text-caption text-weight-medium"
              padding="0px"
              :ripple="false"
            />
          </div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page class="column q-pa-md bg-light">
          <div class="col">
            <q-card
              class="rounded-borders-sm"
              v-if="showFilter('sort')"
              @click="openSort"
            >
              <q-item>
                <q-item-section>
                  <div class="row justify-between text-body2 text-grey-900">
                    <div class="text-weight-medium">Sort by</div>
                    <div>
                      {{
                        sortBy == 'nTof'
                          ? 'Nearest to Farthest'
                          : 'Farthest to Nearest'
                      }}
                    </div>
                  </div>
                </q-item-section>
                <q-item-section side>
                  <q-icon color="gray-300" size="16px" name='ti-angle-right' class="q-pl-md" />
                </q-item-section>
              </q-item>
            </q-card>

            <div class="text-weight-semibold q-mt-md" v-if="showFilter('type')">
              By Type
            </div>

            <q-btn-group
              class="component-shadow full-width q-mt-md bg-white"
              v-if="showFilter('type')"
            >
              <q-btn
                v-for="tab in tabs"
                :key="tab"
                no-caps
                :ripple="false"
                :label="tab"
                class="full-width text-body2"
                :class="[
                  activeType == tab.toLowerCase()
                    ? 'bg-primary-50 border-primary-500 border text-weight-semibold'
                    : ''
                ]"
                padding="12px"
                @click="() => onTabClicked(tab.toLowerCase())"
              ></q-btn>
            </q-btn-group>

            <div
              class="text-weight-semibold q-mt-md"
              v-if="showFilter('category')"
            >
              By Category
            </div>

            <q-card
              class="rounded-borders-md component-shadow q-mt-md"
              v-if="showFilter('category')"
            >
              <q-list separator>
                <q-item
                  v-for="(category, index) in categories"
                  :key="index"
                  clickable
                  @click="category.checked = !category.checked"
                >
                <SNCheckbox :checked="category.checked" class="q-mr-sm"/>
                  <q-item-section avatar>
                    <q-avatar size="20px">
                      <img :src="category.icon" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section
                    class="text-body2"
                    :class="[category.checked ? 'text-weight-semibold text-primary' : '']"
                  >
                    {{ category.label }}
                  </q-item-section>
                  <q-item-section side>
                    <tf-checkbox v-model="category.checked" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>

          <q-btn
            unelevated
            no-caps
            :ripple="false"
            color="primary"
            text-color="white"
            label="Update"
            @click="onUpdateBtnClicked"
            :class="'q-mb-md q-mt-md'"
          ></q-btn>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup>
  import { categoriesList } from '@utils/initials';
  import SNCheckbox from 'components/common/input/SNCheckbox.vue';
  import { Platform, useDialogPluginComponent, useQuasar } from 'quasar';
  import { onMounted, ref } from 'vue';

  // Props
  const props = defineProps({
    filterTypes: {
      type: Array,
      default: () => ['sort', 'type', 'category']
    },
    sortBy: {
      type: String,
      default: 'newToOld'
    },
    byType: {
      type: String,
      default: 'all'
    },
    byCategory: {
      type: Array,
      default: () => []
    }
  });

  // Data
  const {
    dialogRef: filterDialogRef,
    onDialogHide,
    onDialogOK,
    onDialogCancel
  } = useDialogPluginComponent();
  const activeType = ref(props.byType);
  const tabs = ref(['All', 'Faves', 'Asks']);
  const categories = ref(
    categoriesList.map(category => ({
      ...category,
      checked: props.byCategory.includes(category.name)
    }))
  );
  const sortBy = ref(props.sortBy);

  const $q = useQuasar();
  const isIOS = Platform.is.ios;

  // Emits
  defineEmits([...useDialogPluginComponent.emits]);

  function onTabClicked(type) {
    activeType.value = type;
  }

  function onUpdateBtnClicked() {
    const selectedCategories = categories.value
      .filter(category => category.checked)
      .map(c => c.name);

    onDialogOK({
      categories: selectedCategories,
      sortBy: sortBy.value,
      byType: activeType.value
    });
  }

  function resetFilters() {
    categories.value = categoriesList.map(category => ({
      ...category,
      checked: false
    }));
    sortBy.value = 'newToOld';
    activeType.value = 'all';
  }

  function showFilter(name) {
    return props.filterTypes.includes(name);
  }

  onMounted(() => {
    categories.value = categoriesList.map(category => ({
      ...category,
      checked: props.byCategory.includes(category.name)
    }));

    sortBy.value = props.sortBy;
  });

  function openSort() {
    sortBy.value = sortBy.value === 'nTof' ? 'fTon' : 'nTof';
  }
</script>
