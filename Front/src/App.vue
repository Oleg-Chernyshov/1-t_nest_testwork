<template>
  <div id="nav">
    <RouterLink v-if="is_admin" :to="{ name: 'Categories' }"
      >Категории</RouterLink
    >
    <RouterLink v-if="is_admin" :to="{ name: 'Catalog' }">Товары</RouterLink>
    <RouterLink :to="{ name: 'Shop' }">Магазин</RouterLink>
    <RouterLink :to="{ name: 'Chat' }">Чат</RouterLink>
  </div>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const is_admin = computed(() => store.getters.IS_ADMIN);
</script>
<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 15px;
  background: #c8cccc;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  &:not(:last-child) {
    margin-right: 8px;
  }
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
