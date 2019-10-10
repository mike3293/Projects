<template>
  <div class="home">
    <h2 class="home__title">Home page</h2>
    <img src="../shared/assets/logo.png" />
    <br />
    <img v-bind:src="picture" />

    <div class="pic"></div>
  </div>
</template>

<style lang="scss">
.home {
  &__title {
    color: navy;
  }
}
.pic {
  background-image: url("../shared/assets/logo.png");
  margin: auto;
  height: 200px;
  width: 200px;
}
</style>

<script>
import pic from "../shared/assets/logo.png";

export default {
  data: function() {
    return {
      picture: pic,
      version: process.env.VUE_APP_VERSION,
      enviroment: process.env.NODE_ENV
    };
  }
};
</script>