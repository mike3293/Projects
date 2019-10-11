<template>
  <div class="sign-in">
    <div class="sign-in__form">
      <h3 class="sign-in__title">Sign in</h3>
      <input v-model="login" placeholder="Login" class="sign-in__input" />
      <input v-model="password" placeholder="Password" class="sign-in__input" type="password" />
      <div class="sign-in__links">
        <router-link to="/sign-up">Sign up</router-link>
        <router-link to="/">Password?</router-link>
      </div>
      <button>Log in</button>
    </div>
  </div>
</template>

<style lang="scss">
.sign-in {
  &__form {
    width: 40%;
    max-width: 500px;
    display: block;
    border: 2px solid black;
    margin: auto;
    // padding: 10px;
  }

  &__title {
  }

  &__input {
    width: 70%;
    margin-bottom: 8px;
  }
  &__links {
    margin: auto;
    margin-bottom: 5px;
    width: 70%;
    display: flex;
    justify-content: space-between;
  }
}
</style>

<script>
export default {};
</script>