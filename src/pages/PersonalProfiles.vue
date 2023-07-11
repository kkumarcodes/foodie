<template>
  <div
    class="relative rounded-xl bg-ffffff w-full h-[812px] overflow-hidden text-left text-sm text-slategray-200 font-new-header"
  >
    <div class="absolute top-[251px] left-[24px] w-[327px] h-48">
      <div
        class="absolute top-[0px] left-[0px] rounded-2xl bg-whitesmoke-200 w-[327px] h-48"
      />
      <div
        class="absolute h-[20.83%] w-[51.38%] top-[68.75%] right-[42.51%] bottom-[10.42%] left-[6.12%]"
      >
        <div
          class="absolute h-[87.5%] w-[67.86%] top-[7.5%] right-[0%] bottom-[5%] left-[32.14%]"
        >
          <div class="absolute top-[51.43%] left-[0%]">408-841-0926</div>
          <div class="absolute top-[0%] left-[0%] uppercase text-black-color">
            Phone Number
          </div>
        </div>
        <img
          class="absolute h-full w-[23.81%] top-[0%] right-[76.19%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-3425.svg"
        />
      </div>
      <div
        class="absolute h-[20.83%] w-[51.68%] top-[39.58%] right-[42.2%] bottom-[39.58%] left-[6.12%]"
      >
        <div
          class="absolute h-[87.5%] w-[68.05%] top-[7.5%] right-[0%] bottom-[5%] left-[31.95%]"
        >
          <a
            class="absolute top-[51.43%] left-[0%] text-[inherit] [text-decoration:none]"
            href="mailto:hello@halallab.co"
            target="_blank"
            >hello@halallab.co</a
          >
          <div class="absolute top-[0%] left-[0%] uppercase text-black-color">
            Email
          </div>
        </div>
        <img
          class="absolute h-full w-[23.67%] top-[0%] right-[76.33%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-3423.svg"
        />
      </div>
      <div
        class="absolute h-[20.83%] w-[45.26%] top-[10.42%] right-[48.62%] bottom-[68.75%] left-[6.12%]"
      >
        <div
          class="absolute h-[87.5%] w-[63.51%] top-[7.5%] right-[0%] bottom-[5%] left-[36.49%]"
        >
          <div class="absolute top-[51.43%] left-[0%]">Vishal Khadok</div>
          <div class="absolute top-[0%] left-[0%] uppercase text-black-color">
            Full Name
          </div>
        </div>
        <img
          class="absolute h-full w-[27.03%] top-[0%] right-[72.97%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-3363.svg"
        />
      </div>
    </div>
    <div
      class="absolute top-[119px] left-[24px] w-[272px] h-[100px] text-xl text-gray-300"
    >
      <img
        class="absolute top-[0px] left-[0px] w-[100px] h-[100px]"
        alt=""
        src="/profile.svg"
      />
      <b class="absolute top-[22px] left-[132px] capitalize">Vishal Khadok</b>
      <div
        class="absolute top-[54px] left-[132px] text-sm leading-[24px] text-darkgray-300"
      >
        I love fast food
      </div>
    </div>
    <AppTopBar back="/back.svg" title="Personal Info" right="EDIT" />
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";
  import AppTopBar from "../components/AppTopBar.vue";

  export default defineComponent({
    name: "PersonalProfiles",
    components: { AppTopBar },
  });
</script>
