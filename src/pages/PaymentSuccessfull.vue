<template>
  <div
    class="relative rounded-3xl bg-ffffff w-full h-[812px] overflow-hidden text-center text-base text-ffffff font-new-header"
  >
    <div
      class="absolute h-[7.64%] w-[calc(100%_-_48px)] top-[88.18%] right-[24px] bottom-[4.19%] left-[24px]"
    >
      <div
        class="absolute h-full w-full top-[0%] right-[0px] bottom-[0%] left-[0px] rounded-xl bg-darkorange-100"
      />
      <b class="absolute top-[35.48%] left-[32.72%] uppercase">Track Order</b>
    </div>
    <img
      class="absolute h-[25.53%] w-[60.8%] top-[29.31%] right-[18.67%] bottom-[45.16%] left-[20.53%] max-w-full overflow-hidden max-h-full"
      alt=""
      src="/success-illustation.svg"
    />
    <div
      class="absolute top-[64.71%] left-[19.07%] text-sm leading-[24px] text-c67 opacity-[0.6] mix-blend-normal"
    >
      <p class="m-0">You successfully maked a payment,</p>
      <p class="m-0">enjoy our service!</p>
    </div>
    <b
      class="absolute top-[58.8%] left-[23.87%] text-5xl leading-[32px] text-a2c"
      >Congratulations!</b
    >
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "PaymentSuccessfull",
  });
</script>
