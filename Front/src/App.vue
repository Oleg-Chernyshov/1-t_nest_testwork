<template>
  <div id="nav">
    <RouterLink :to="{ name: 'Categories' }">Категории</RouterLink>
    <RouterLink :to="{ name: 'Catalog' }">Товары</RouterLink>
    <RouterLink :to="{ name: 'Shop' }">Магазин</RouterLink>
    <RouterLink :to="{ name: 'Catalog' }">Чат</RouterLink>
  </div>
  <router-view />
</template>
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
