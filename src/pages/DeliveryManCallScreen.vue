<template>
  <div
    class="relative rounded-xl bg-gray-500 w-full h-[812px] overflow-hidden text-left text-xl text-gray-300 font-new-header"
  >
    <div
      class="absolute top-[-15.23px] left-[-599.52px] w-[1262.12px] h-[842.47px]"
    >
      <div
        class="absolute top-[0px] left-[0px] bg-darkgray-400 w-[1262.12px] h-[842.47px]"
      />
      <div
        class="absolute top-[15.23px] left-[599.52px] bg-darkslategray-200 w-[375px] h-[813px]"
      />
    </div>
    <div class="absolute top-[435px] left-[0px] w-[375px] h-[377px]">
      <div
        class="absolute top-[0px] left-[0px] rounded-t-3xl rounded-b-none bg-ffffff w-[375px] h-[377px]"
      />
      <b class="absolute top-[142px] left-[133px] capitalize">Robert Fox</b>
      <div
        class="absolute top-[173px] left-[128px] text-base leading-[129%] text-darkgray-600 text-center"
      >
        Connecting.......
      </div>
      <div
        class="absolute top-[24px] left-[134.99px] w-[105.01px] h-[105.01px]"
      >
        <div
          class="absolute top-[0px] left-[-53.15px] bg-darkgray-400 w-[173.73px] h-[115.96px]"
        />
      </div>
      <img
        class="absolute top-[222px] left-[130px] w-[115px] h-[114px]"
        alt=""
        src="/end-icon.svg"
      />
      <img
        class="absolute top-[278.77px] left-[275.23px] w-[48.23px] h-[48.23px]"
        alt=""
        src="/speaker.svg"
      />
      <img
        class="absolute top-[278.77px] left-[52px] w-[48.23px] h-[48.23px]"
        alt=""
        src="/mute.svg"
      />
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "DeliveryManCallScreen",
  });
</script>
