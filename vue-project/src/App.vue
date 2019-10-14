<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/home" class="nav__page-links">Test page with 4 pic</router-link>
      <router-link to="/about" class="nav__page-links">About</router-link>
      <router-link to="/" class="nav__page-links">Sign in</router-link>
    </nav>
    <router-view />
    <footer />
  </div>
</template>

<style lang="scss">
@import "./variables.scss";

* {
  box-sizing: border-box;
  // text-decoration: none;
}

body {
  margin: 0px;
  font-size: 16px;
}

.app {
  font-family: $avenir;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
  text-align: right;
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