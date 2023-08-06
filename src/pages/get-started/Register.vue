<template>
  <div class="register1">
    <div class="jbizz5">Foodie</div>

    <div class="headline-parent1">
      <div class="headline11">Registration 👍</div>
      <div class="headline12">Let’s Register. Apply to jobs!</div>
    </div>
    <div class="rectangle-parent">
      <q-input outlined placeholder="Full Name" v-model="fullName">
        <template v-slot:prepend>
          <img alt="" src="/profile.svg" />
        </template>
      </q-input>

    </div>
    <div class="rectangle-parent">
      <q-input outlined placeholder="E-mail" v-model="email" type="email">
        <template v-slot:prepend>
          <img alt="" src="/mailoutline.svg" />
        </template>
      </q-input>


    </div>
    <div class="rectangle-parent">
      <q-input outlined placeholder="Password" v-model="password" type="password">
        <template v-slot:prepend>
          <img alt="" src="/password.svg" />
        </template>
      </q-input>

    </div>
    <div class="rectangle-parent">
      <q-input outlined placeholder="Confirm Password" v-model="confirmPassword" type="password">
        <template v-slot:prepend>
          <img alt="" src="/password.svg" />
        </template>
      </q-input>

    </div>
    <q-btn no-caps class="button7" color="primary" @click="onRegister" :disable="!isFormValid">
      Register
    </q-btn>
    <div class="or-continue-with-parent">

      <div class="line-div" />
      <div class="or-continue-with">Or continue with</div>
      <div class="line-div" />
    </div>
    <div class="have-an-account-container">
      <span>Have an account? </span>
      <span class="log-in1" @click="onLogin">Log in</span>
    </div>

  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  computed,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores';

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();
    const fullName = ref(null);
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);

    const userStore = useUserStore();
    const { registerUser } = userStore;

    const isFormValid = computed(() => {
      return (
        String(fullName.value) !== '' &&
        String(email.value) !== '' &&
        String(password.value) !== '' &&
        String(password.value) === String(confirmPassword.value)
      );
    });

    onBeforeMount(() => {
    });

    function onLogin() {
      router.push({ name: 'login' });
    }
    async function onRegister() {
      const registerResult = await registerUser({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      });
      const { route = { name: 'search' } } = registerResult;
      router.replace(route);
    }
    return {
      fullName,
      email,
      password,
      confirmPassword,
      isFormValid,
      onLogin,
      onRegister
    };
  }
});
</script>
