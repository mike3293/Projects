<template>
    <div class="sign-in">
        <form v-on:submit.prevent class="sign-in__form">
            <h3 class="sign-in__title">Sign in</h3>
            <input required v-model="login" placeholder="Login" class="sign-in__input" />
            <input
                required
                v-model="password"
                placeholder="Password"
                class="sign-in__input"
                type="password"
            />
            <div class="sign-in__links">
                <router-link to="/sign-up">Sign up</router-link>
                <router-link to="/">Password?</router-link>
            </div>
            <button class="sign-in__button button" v-on:click="sign(login, password)">Sign in</button>
        </form>
    </div>
</template>

<style lang="scss">
@import "../../shared/components/button/button.css";
.sign-in {
    &__form {
        width: 35%;
        max-width: 400px;
        display: block;
        border: 2px solid black;
        margin: 100px auto;
    }

    &__title {
    }

    &__input {
        width: 70%;
        margin-bottom: 20px;
    }
    &__links {
        margin: auto;
        margin-bottom: 5px;
        width: 70%;
        display: flex;
        justify-content: space-between;
    }

    &__button {
        margin: 10px auto;
    }
}
</style>

<script>
//import CommonButton from "../../shared/components/button/CommonButton.vue";
import { signIn } from "../firebase";
export default {
    name: "sign-in",
    data: function() {
        return {
            login: "m@gmail.com",
            password: "123456"
        };
    },
    methods: {
        sign: signIn
    }
};
</script>