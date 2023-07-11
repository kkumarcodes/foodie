<template>
  <div
    class="relative rounded-xl bg-ffffff w-full h-[808px] overflow-hidden text-left text-sm text-darkslategray-300 font-new-header"
  >
    <div
      class="absolute top-[716px] left-[24px] w-[327px] h-[62px] text-center text-ffffff"
    >
      <div
        class="absolute top-[0px] left-[0px] rounded-xl bg-darkorange-100 w-[327px] h-[62px]"
      />
      <b class="absolute top-[23px] left-[107px] uppercase">Pay & Confirm</b>
    </div>
    <div
      class="absolute top-[516px] left-[24px] w-[327px] h-[62px] text-center text-darkorange-100"
    >
      <img
        class="absolute top-[0px] left-[0.04px] rounded-3xs w-[327px] h-[62px]"
        alt=""
        src="/rectangle-1344.svg"
      />
      <div
        class="absolute h-[27.42%] w-[28.18%] top-[37.1%] right-[36.04%] bottom-[35.48%] left-[35.78%]"
      >
        <img
          class="absolute h-[94.95%] w-[17.52%] top-[5.46%] right-[83.57%] bottom-[-0.42%] left-[-1.09%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/close.svg"
        />
        <b class="absolute top-[0px] left-[24.14px] uppercase">Add New</b>
      </div>
    </div>
    <div
      class="absolute top-[244px] left-[24px] w-[327px] h-[257px] text-center text-mini text-darkslategray-600"
    >
      <img
        class="absolute top-[0px] left-[0px] rounded-3xs w-[327px] h-[257px]"
        alt=""
        src="/rectangle-13441.svg"
      />
      <img
        class="absolute top-[-103.23px] left-[-24px] w-[375px] h-[385.14px]"
        alt=""
        src="/42.svg"
      />
      <div
        class="absolute top-[184px] left-[30px] tracking-[0.5px] leading-[24px] inline-block w-[266px] h-[61px] opacity-[0.7] mix-blend-normal"
      >
        You can add a mastercard and save it for later
      </div>
      <b
        class="absolute top-[159px] left-[77px] text-base text-black-color text-left"
        >No master card added</b
      >
    </div>
    <div
      class="absolute top-[652px] left-[87px] text-11xl capitalize text-gray-300 text-center"
    >
      $96
    </div>
    <div
      class="absolute top-[658px] left-[24px] leading-[24px] uppercase text-darkgray-300"
    >
      Total:
    </div>
    <div class="absolute top-[126px] left-[328px] w-[85px] h-[93px]">
      <img
        class="absolute top-[0px] left-[0px] w-[85px] h-[72px]"
        alt=""
        src="/group-2644.svg"
      />
      <div class="absolute top-[76px] left-[19px]">PayPal</div>
    </div>
    <div class="absolute top-[119px] left-[226px] w-[86px] h-[100px]">
      <img
        class="absolute top-[6px] left-[-1px] w-[87px] h-[74px]"
        alt=""
        src="/group-2429.svg"
      />
      <img
        class="absolute top-[0px] left-[62px] w-6 h-6"
        alt=""
        src="/group-2654.svg"
      />
      <div class="absolute top-[83px] left-[5px]">Mastercard</div>
    </div>
    <div class="absolute top-[126px] left-[125px] w-[85px] h-[93px]">
      <img
        class="absolute top-[0px] left-[0px] rounded-[9.62px] w-[85px] h-[72px]"
        alt=""
        src="/rectangle-1260.svg"
      />
      <img
        class="absolute h-[14.2%] w-[47.88%] top-[31.9%] right-[26.22%] bottom-[53.9%] left-[25.9%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group.svg"
      />
      <div class="absolute top-[76px] left-[28px]">Visa</div>
    </div>
    <div class="absolute top-[126px] left-[24px] w-[85px] h-[93px]">
      <img
        class="absolute top-[0px] left-[0px] w-[85px] h-[72px]"
        alt=""
        src="/group-2643.svg"
      />
      <div class="absolute top-[76px] left-[27px]">Cash</div>
    </div>
    <div
      class="absolute top-[50px] left-[24px] w-[136px] h-[45px] text-mid text-gray-300"
    >
      <div class="absolute top-[12px] left-[63px] leading-[22px]">Payment</div>
      <img
        class="absolute top-[0px] left-[0px] w-[45px] h-[45px]"
        alt=""
        src="/back.svg"
      />
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "PaymentMethodNoMastercard",
  });
</script>
