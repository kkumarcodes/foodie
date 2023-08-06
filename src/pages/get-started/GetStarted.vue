<template>
  <div class="log-in">
    <div class="jbizz5">Foodie</div>
    <div class="group-div">
      <div class="headline9">Welcome Back 👋</div>
      <div class="headline10">Let’s log in. Apply to services!</div>
    </div>
    <div class="button-parent">
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
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <q-btn no-caps class="login-button" color="primary" @click="onLogin" :disable="!isFormValid">
        Log In
      </q-btn>


    </div>
    <div class="forgot-password1" @click="onForgotPasswordClick">Forgot Password?</div>

    <div class="or-continue-with-parent">

      <div class="line-div" />
      <div class="or-continue-with">Or continue with</div>
      <div class="line-div" />
    </div>

    <div class="havent-an-account-container">
      <span>Haven’t an account? </span>
      <span class="register" @click="onRegisterContainerClick">Register</span>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  ref,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores';

export default defineComponent({
  name: 'GetStarted',
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);

    const userStore = useUserStore();
    const { loginUser } = userStore;
    const isFormValid = computed(() => {
      return (
        String(email.value) !== '' &&
        String(password.value) !== ''
      );
    });
    onBeforeMount(() => {
    });

    function onRegisterContainerClick() {
      router.push({ name: 'register' });
    }
    function onForgotPasswordClick() {
      router.push({ name: 'forgot-password' });
    }
    async function onLogin() {
      const registerResult = await loginUser({
        email: email.value,
        password: password.value,
      });
      const { route = { name: 'search' } } = registerResult;
      router.replace(route);
    }
    return {
      onRegisterContainerClick,
      onForgotPasswordClick,
      onLogin,
      isPwd: ref(true),
      email,
      password,
      isFormValid,
    };
  }
});
</script>
