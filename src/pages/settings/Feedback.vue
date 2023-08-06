<template>
  <q-page class="q-pa-md column bg-light">
    <q-input
      outlined
      type="textarea"
      id="feedback"
      placeholder="Enter your feedback here"
      v-model="msg"
    >
    </q-input>
    <q-btn
      flat
      no-caps
      color="white"
      class="bg-primary-700 text-weight-medium q-mt-xl text-body1"
      label="Submit"
      :disable="disableSubmit"
      padding="10px"
      @click="submitFeedback"
    />
  </q-page>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { setAppHeader } from 'src/utils/helpers/common';
  import { useUserStore } from 'src/stores';

  setAppHeader({
    title: 'Write Feedback',
    backNav: true
  });

  const msg = ref('');

  const disableSubmit = computed(() => msg.value.length < 1);

  const $q = useQuasar();
  const { addFeedback } = useUserStore();

  async function submitFeedback() {
    const { success } = await addFeedback(msg.value);

    if (success) {
      $q.notify({
        type: 'primary',
        message: 'Feedback Submitted!',
        caption: 'Thanks for submitting the Feedback!'
      });

      msg.value = '';
    }
  }
</script>
