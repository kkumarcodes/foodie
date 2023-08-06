<template>
  <div class="q-py-md" @click="handleItemClick">
    <q-item class="no-padding">
      <q-item-section top avatar>
        <q-avatar color="primary" text-color="white">
          <q-img :src="avatar" v-if="avatar" :ratio="1" />
          <span v-else class="text-body1 text-weigth-semibold">
            {{ name.at(0) }}
          </span>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-body2 text-weight-semibold text-grey-900">
          {{ name }}
        </q-item-label>
        <q-item-label class="text-body2 text-grey-900" lines="2">
          {{ message }}
        </q-item-label>
        <q-item-label class="text-caption text-grey-400">
          {{ time }}
        </q-item-label>
      </q-item-section>

      <q-item-section side top v-if="type == 'snag' || type == 'fave'">
        <q-avatar v-if="resource.images && resource.images[0]" color="primary" text-color="white" size="48px"
          class="rounded-borders-3xs">
          <q-img :src="resource.images[0]" :ratio="1" />
        </q-avatar>
      </q-item-section>
    </q-item>
    <div v-if="type == 'suggestion'"
      class="q-mt-xs q-px-md q-py-sm rounded-borders-xs border-accent ask-card border-2 text-caption text-grey-900">
      <div class="text-weight-semibold">{{ resource.title }}</div>
      <q-item class="no-padding q-mt-xs" v-if="shortLocation">
        <q-item-section avatar>
          <q-icon size="16px" name="ti-location-pin" />
        </q-item-section>
        <q-item-section class="text-caption negative-margin">
          <q-item-label>
            <span class="text-weight-semibold">Where at:</span>
            {{ shortLocation }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import { Timestamp } from '@firebase/firestore';
import { relTime } from '@utils/filters';
import { computed } from 'vue';

const props = defineProps({
  initiator: {
    type: Object,
    default: () => ({})
  },
  resourceId: {
    type: String,
    required: false
  },
  sourceUid: { type: String, required: true },
  resource: {
    type: Object,
    default: () => ({})
  },
  createdAt: {
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

// const emit = defineEmits(['onItemClick', 'onConfirmClick', 'onDeleteClick']);
const emit = defineEmits(['onItemClick']);

const name = computed(() => {
  const { firstName = '', lastName = '' } = props.initiator;
  return `${firstName} ${lastName}`;
});

const avatar = computed(() => props.initiator?.avatar);

const message = computed(() => {
  let notificationMessage = '';
  switch (props.type) {
    case 'request':
      notificationMessage = 'Tap to accept the circle request';
      break;
    case 'suggestion':
      notificationMessage = 'has suggested a Fave to your Ask';
      break;
    case 'snag':
      notificationMessage = 'has Snagged your Fave';
      break;
    case 'fave':
      notificationMessage = 'has shared a Fave with you';
      break;

    case 'ask-chat':
      notificationMessage = 'has sent a private message';
      break;
    default:
      notificationMessage = '';
      break;
  }
  return notificationMessage;
});

const time = computed(() => {
  const createdAt = props.createdAt;
  if (createdAt && typeof createdAt === 'object') {
    const { seconds, nanoseconds } = createdAt;
    const createdTime = new Timestamp(seconds, nanoseconds)
      .toDate()
      .toISOString();
    return relTime(createdTime);
  }
  return relTime(createdAt);
});

const shortLocation = computed(() => {
  const state = props.resource?.place?.address?.state;
  const country = props.resource?.place?.address?.country;
  if (!!state && !!country) {
    return `${state}, ${country}`;
  }
  if (state) {
    return state;
  }
  if (country) {
    return country;
  }
  return '';
});

const destinationRoute = computed(() => {
  const { type, resourceId, sourceUid } = props;
  const preparedRoute = {};
  switch (type) {
    case 'request':
      preparedRoute.name = 'circle-profile';
      preparedRoute.params = { id: sourceUid };
      break;
    case 'suggestion':
      preparedRoute.name = 'ask-details';
      preparedRoute.params = { id: resourceId };
      break;
    case 'ask-chat':
      preparedRoute.name = 'ask-details';
      preparedRoute.params = { id: resourceId };
      break;
    case 'snag':
      preparedRoute.name = 'fave-details';
      preparedRoute.params = { id: resourceId };
      break;
    case 'fave':
      preparedRoute.name = 'fave-details';
      preparedRoute.params = { id: resourceId };
      break;
    default:
      break;
  }
  return preparedRoute;
});

function handleItemClick() {
  emit('onItemClick', destinationRoute.value);
}
</script>

<style lang="scss" scoped>
.ask-card {
  background: linear-gradient(38.3deg,
      rgba(255, 219, 91, 1) 0%,
      rgba(255, 236, 170, 1) 100%);
}

.negative-margin {
  margin-left: -8px;
}
</style>
