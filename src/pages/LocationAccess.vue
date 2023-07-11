<template>
  <div
    class="relative rounded-xl bg-ffffff w-full h-[812px] overflow-hidden text-center text-base text-slategray-300 font-new-header"
  >
    <div
      class="absolute top-[618px] left-[26px] leading-[24px] inline-block w-[323px]"
    >
      DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
    </div>
    <div
      class="absolute top-[519.5px] left-[24px] w-[327px] h-[62px] text-ffffff"
    >
      <img
        class="absolute top-[0px] left-[0px] rounded-xl w-[327px] h-[62px]"
        alt=""
        src="/rectangle-134421.svg"
      />
      <b class="absolute top-[22px] left-[62px] uppercase">Access LOCATION</b>
      <img
        class="absolute top-[15px] left-[234px] w-8 h-8"
        alt=""
        src="/map-pin.svg"
      />
    </div>
    <div
      class="absolute top-[176px] left-[84px] rounded-[90px] bg-darkgray-400 w-[206px] h-[250px]"
    />
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "LocationAccess",
  });
</script>
