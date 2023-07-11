<template>
  <div
    class="relative rounded-xl bg-ffffff w-full h-[812px] overflow-hidden text-center text-base text-slategray-300 font-new-header"
  >
    <div class="absolute top-[753px] left-[171px]">Skip</div>
    <div
      class="absolute top-[675px] left-[24px] w-[327px] h-[62px] text-sm text-ffffff"
    >
      <div
        class="absolute top-[0px] left-[0px] rounded-xl bg-darkorange-100 w-[327px] h-[62px]"
      />
      <b class="absolute top-[23px] left-[144px] uppercase">Next</b>
    </div>
    <img
      class="absolute top-[596px] left-[149px] w-[76px] h-2.5"
      alt=""
      src="/slide2.svg"
    />
    <div
      class="absolute top-[516px] left-[25px] leading-[24px] inline-block w-[324px]"
    >
      <p class="m-0">Get all your loved foods in one once place,</p>
      <p class="m-0">you just place the orer we do the rest</p>
    </div>
    <div
      class="absolute top-[469px] left-[83px] text-5xl font-extrabold text-black-color"
    >
      All your favorites
    </div>
    <div
      class="absolute top-[114px] left-[67px] rounded-xl bg-darkgray-400 w-60 h-[292px]"
    />
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "Onboarding01",
  });
</script>
