<template>
  <q-page class="q-pa-md column bg-light">
    <q-rating :class="{ 'q-ma-md': true, 'apply-shake': shake }" name="rating" v-model="rating" max="5" size="3.5em"
      color="yellow" icon="star_border" icon-selected="star" no-dimming />
    <q-input outlined type="textarea" id="review" placeholder="Enter your review here" v-model="msg">
    </q-input>
    <q-btn flat no-caps color="white" class="bg-primary-700 text-weight-medium q-mt-xl text-body1" label="Submit"
      :disable="disableSubmit" padding="10px" @click="submitFeedback" />
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { setAppHeader } from 'src/utils/helpers/common';
import { useUserStore, useServiceStore } from 'src/stores';
import { storeToRefs } from 'pinia';
import { firebaseAuth } from 'boot/firebase';

setAppHeader({
  title: 'Write Review',
  backNav: true
});

const serviceStore = useServiceStore();
const { service } =
  storeToRefs(serviceStore);
const msg = ref('');
const rating = ref(0);
const shake = ref(false);

const disableSubmit = computed(() => msg.value.length < 1);

const $q = useQuasar();
const { addReview } = useUserStore();

async function submitFeedback() {
  if (rating.value === 0) {
    shake.value = true;
      setTimeout(() => {
        shake.value = false;
      }, 820);
    return;
  }
  if (msg.value.length < 20) {
    $q.notify({
      type: 'error',
      message: 'Error!',
      caption: 'Please provide enough information'
    });
    return;
  }

  let data = {...service.value};
  delete data['id']
  const user = firebaseAuth.currentUser;
  const { uid } = user;
  if (data.reviews?.some(el => el.uid === uid)) {
    $q.notify({
      type: 'error',
      message: 'Error!',
      caption: 'You already gave the review.'
    });
    return;
  }
  if (data.uid === uid) {
    $q.notify({
      type: 'error',
      message: 'Error!',
      caption: 'You can\'t write review.'
    });
    return;
  }
  if (data.reviews?.length === undefined) {
    data.reviews = [{rating: rating.value, text: msg.value, time: new Date().getMilliseconds()/1000, uid}]
  } else {
    data.reviews.push({rating: rating.value, text: msg.value, time: new Date().getTime(), uid})
  }
  const { success } = await addReview(data);

  if (success) {
    $q.notify({
      type: 'primary',
      message: 'Review Submitted!',
      caption: 'Thanks for submitting the Review!'
    });

    msg.value = '';
  }
}
</script>
<style>
@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>