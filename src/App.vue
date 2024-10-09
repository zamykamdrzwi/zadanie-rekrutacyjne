<script setup>
import { RouterView } from 'vue-router';
import TopMenu from "./components/TopMenu.vue";
</script>

<template>
  <top-menu />
  <RouterView />
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Afacad Flux", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "slnt" 0;
  color: #333333;
  letter-spacing: 1px;
}
</style>
