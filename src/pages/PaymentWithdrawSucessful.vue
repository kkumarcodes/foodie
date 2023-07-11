<template>
  <div
    class="relative rounded-6xl bg-ffffff w-full h-[812px] overflow-hidden text-left text-3xl text-black-100 font-poppins"
  >
    <div class="absolute top-[219px] left-[24px] w-[327px] h-[374px]">
      <div class="absolute top-[261px] left-[48px] font-medium">
        Withdraw Successful
      </div>
      <img
        class="absolute h-[48.4%] w-[79.6%] top-[0%] right-[10.31%] bottom-[51.6%] left-[10.09%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group-320.svg"
      />
      <div
        class="absolute top-[56px] left-[184px] rounded-[50%] bg-yellow w-2.5 h-2.5 opacity-[0.3]"
      />
      <div
        class="absolute top-[112px] left-[35px] rounded-[50%] bg-yellow w-2.5 h-2.5 opacity-[0.3]"
      />
      <div
        class="absolute h-[16.04%] w-full top-[83.96%] right-[0%] bottom-[0%] left-[0%] text-center text-lg text-ffffff font-new-header"
      >
        <div
          class="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-darkorange-100"
        />
        <div class="absolute top-[31.67%] left-[45.87%] uppercase">Ok</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "PaymentWithdrawSucessful",
  });
</script>
