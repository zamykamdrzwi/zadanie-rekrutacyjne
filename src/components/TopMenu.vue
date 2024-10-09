<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section>
    <nav class="container">
      <div class="container__menu">
        <RouterLink to="/">zadanie 1</RouterLink>
        <RouterLink to="/zadanie_2">zadanie 2</RouterLink>
        <RouterLink to="/zadanie_3">zadanie 3</RouterLink>
      </div>
    </nav>
  </section>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 25px 0 25px 0;

  &__menu {
    display: flex;
    gap: 40px;
    list-style: none;
    padding: 0;
    margin: 0;

    a {
      text-decoration: none;
      font-size: 19px;
      color: #333333;
      padding: 5px;
    }

    a:hover {
      background-color: #E0E0E0;
    }
  }
}
</style>