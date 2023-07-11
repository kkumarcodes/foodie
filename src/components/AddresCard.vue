<template>
  <div
    class="absolute h-[12.44%] w-[87.2%] top-[14.66%] right-[6.4%] bottom-[72.91%] left-[6.4%] text-left text-sm text-black-color font-new-header"
    :style="homeStyle"
  >
    <div
      class="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-2xl bg-aliceblue-100"
    />
    <div class="absolute top-[15.84%] left-[23.55%] uppercase">{{title}}</div>
    <div
      class="absolute w-[71.25%] top-[41.58%] left-[23.55%] inline-block opacity-[0.5]"
    >
      {{addressline1}}
    </div>
    <img
      class="absolute h-[17.08%] w-[4.8%] top-[14.64%] right-[4.51%] bottom-[68.28%] left-[90.69%] max-w-full overflow-hidden max-h-full"
      alt=""
      :src="goDelete"
    />
    <img
      class="absolute h-[47.52%] w-[14.68%] top-[15.84%] right-[80.73%] bottom-[36.63%] left-[4.59%] max-w-full overflow-hidden max-h-full"
      alt=""
      :src="avatar"
    />
    <img
      class="absolute h-[16.43%] w-[5.07%] top-[15.1%] right-[15.03%] bottom-[68.47%] left-[79.89%] max-w-full overflow-hidden max-h-full"
      alt=""
      :src="goEdit"
    />
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "AddresCard",
    props: {
      title: { type: String },
      addressline1: { type: String },
      goDelete: { type: String },
      goEdit: { type: String },
      avatar: { type: String },
      homeTop: { type: [Object, Array, String, Number, Boolean] },
      homeBottom: { type: [Object, Array, String, Number, Boolean] },
    },
    computed: {
      homeStyle() {
        return {
          top: this.homeTop,
          bottom: this.homeBottom,
        };
      },
    },
  });
</script>
