<template>
  <div
    class="absolute top-[50px] left-[24px] w-[327px] h-[45px] text-left text-mid text-gray-300 font-new-header"
  >
    <img
      class="absolute top-[0px] left-[0px] w-[45px] h-[45px]"
      alt=""
      :src="back"
    />
    <div class="absolute top-[11.5px] left-[61px] leading-[22px]">
      {{title}}
    </div>
    <div
      class="absolute top-[11px] left-[292px] text-sm [text-decoration:underline] leading-[24px] uppercase text-darkorange-100 text-right"
    >
      {{right}}
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "AppTopBar",
    props: {
      back: { type: String },
      title: { type: String },
      right: { type: String },
    },
  });
</script>
