<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="nav__page-links">Home</router-link>
      <router-link to="/about" class="nav__page-links">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./variables.scss";

.app {
  font-family: $avenir;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;

  &__page-links {
    font-weight: bold;
    color: #2c3e50;
    margin-left: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>