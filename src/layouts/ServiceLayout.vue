<template>
  <q-layout view="hHh lpr fFf">
    <q-header>
      <AppHeader />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import AppHeader from 'components/common/navigation/AppHeader.vue';
</script>
