<template>
  <img class="akar-iconschevron-left" alt="" src="/akariconschevronleft.svg" @click="onBackClick" />
  <div class="forgot-password">
    <div class="jbizz5">Foodie</div>
    <div class="headline-group">
      <div class="headline3">Forgot Password</div>
      <div class="headline4">
        Enter your email or phone number, we will send you verification code
      </div>
    </div>
    <div class="button-parent">
      <div class="rectangle-parent">
        <q-input outlined placeholder="E-mail">
          <template v-slot:prepend>
            <img alt="" src="/mailoutline-1.svg" />
          </template>
        </q-input>
      </div>
      <q-btn no-caps class="login-button" color="primary">
        Send code
      </q-btn>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GetStarted',
  setup() {
    const router = useRouter();

    onBeforeMount(() => {
    });

    function onBackClick() {
      router.push({ name: 'login' });
    }
    return {
      onBackClick,
    };
  }
});
</script>
