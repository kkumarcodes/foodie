<template>
  <div
    class="relative rounded-6xl bg-ffffff w-full h-[812px] overflow-hidden text-center text-sm text-ffffff font-new-header"
  >
    <AddresCard
      title="Home"
      addressline1="2464 Royal Ln. Mesa, New Jersey 45463"
      goDelete="/delete-icon.svg"
      goEdit="/edit-icon.svg"
      avatar="/home.svg"
    /><AddresCard
      title="Work"
      addressline1="3891 Ranchview Dr. Richardson, California 62639"
      goDelete="/delete-icon.svg"
      goEdit="/edit-icon.svg"
      avatar="/office.svg"
      homeTop="29.56%"
      homeBottom="58%"
    />
    <div class="absolute top-[720px] left-[24px] w-[327px] h-[62px]">
      <div
        class="absolute top-[0px] left-[0px] rounded-xl bg-darkorange-100 w-[327px] h-[62px]"
      />
      <b class="absolute top-[22px] left-[95px] uppercase">Add new address</b>
    </div>
    <div
      class="absolute top-[50px] left-[24px] w-[152px] h-[45px] text-left text-mid text-black-color"
    >
      <img
        class="absolute top-[0px] left-[0px] w-[45px] h-[45px]"
        alt=""
        src="/back1.svg"
      />
      <div class="absolute top-[12px] left-[61px] leading-[22px]">
        My Address
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";
  import AddresCard from "../components/AddresCard.vue";

  export default defineComponent({
    name: "Address",
    components: { AddresCard },
  });
</script>
