<template>
  <div
    class="relative rounded-xl bg-ffffff w-full h-[812px] overflow-hidden text-left text-sm text-darkgray-300 font-new-header"
  >
    <div
      class="absolute top-[716px] left-[24px] w-[327px] h-[62px] text-center text-ffffff"
    >
      <div
        class="absolute top-[0px] left-[0px] rounded-xl bg-darkorange-100 w-[327px] h-[62px]"
      />
      <b class="absolute top-[23px] left-[83px] uppercase"
        >Add & Make Payment</b
      >
    </div>
    <div class="absolute top-[355px] left-[201px] w-[150px] h-[94px]">
      <div class="absolute top-[0px] left-[0px] leading-[24px] uppercase">
        cvc
      </div>
      <img
        class="absolute top-[32px] left-[0px] rounded-3xs w-[150px] h-[62px]"
        alt=""
        src="/rectangle-13442.svg"
      />
      <div
        class="absolute top-[54px] left-[20px] text-base text-black-color opacity-[0.5]"
      >
        ***
      </div>
    </div>
    <div class="absolute top-[355px] left-[24px] w-[150px] h-[94px]">
      <div class="absolute top-[0px] left-[0px] leading-[24px] uppercase">
        expire date
      </div>
      <img
        class="absolute top-[32px] left-[0px] rounded-3xs w-[150px] h-[62px]"
        alt=""
        src="/rectangle-13442.svg"
      />
      <div
        class="absolute top-[54px] left-[20px] text-base text-black-color opacity-[0.5]"
      >
        mm/yyyy
      </div>
    </div>
    <div class="absolute top-[237px] left-[24px] w-[327px] h-[94px]">
      <div class="absolute top-[0px] left-[0px] leading-[24px] uppercase">
        Card number
      </div>
      <img
        class="absolute top-[32px] left-[0px] rounded-3xs w-[327px] h-[62px]"
        alt=""
        src="/rectangle-13445.svg"
      />
      <div
        class="absolute top-[53.5px] left-[20px] text-base text-black-color opacity-[0.9]"
      >
        2134 _ _ _ _ _ _ _ _
      </div>
      <div
        class="absolute top-[54.8px] left-[66.8px] box-border w-px h-4 border-r-[1px] border-solid border-darkslategray-400"
      />
    </div>
    <div class="absolute top-[119px] left-[24px] w-[327px] h-[94px]">
      <div
        class="absolute top-[0px] left-[0px] leading-[24px] uppercase inline-block w-[145px] h-[23.98px]"
      >
        card holder name
      </div>
      <img
        class="absolute top-[32.05px] left-[0px] rounded-3xs w-[327px] h-[61.95px]"
        alt=""
        src="/rectangle-13443.svg"
      />
      <div
        class="absolute top-[53.53px] left-[20px] text-base text-black-color inline-block w-[108px] h-[18.98px] opacity-[0.9]"
      >
        Vishal Khadok
      </div>
    </div>
    <div
      class="absolute top-[50px] left-[24px] w-[139.3px] h-[45px] text-mid text-gray-300"
    >
      <div class="absolute top-[12px] left-[63.3px] leading-[22px]">
        Add Card
      </div>
      <img
        class="absolute top-[0px] left-[0px] w-[45px] h-[45px]"
        alt=""
        src="/close1.svg"
      />
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "AddCard",
  });
</script>
