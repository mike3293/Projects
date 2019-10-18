<template>
    <div class="sign-up">
        <form v-on:submit.prevent="signup(login, password, name)" class="sign-up__form">
            <h3 class="sign-up__title">Sign up</h3>
            <input required v-model="name" placeholder="Name" class="sign-up__input" />
            <input
                required
                v-model="login"
                placeholder="Login (email)"
                type="email"
                class="sign-up__input"
            />

            <input required v-model="password" placeholder="Password" class="sign-up__input" />
            <input
                required
                v-model="passwordValid"
                placeholder="Repeat password"
                class="sign-up__input"
                v-bind:class="{ notSame: comparePasswords }"
            />
            <button class="sign-up__button button">Sign up</button>
            <!-- <CommonButton msg="Sign up" class="sign-up__button" /> -->
        </form>
    </div>
</template>

<style lang="scss">
.sign-up {
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
.notSame {
    border-color: rgb(255, 131, 115);
}
</style>

<script>
//import CommonButton from "../../shared/components/button/CommonButton.vue";
import { signUp } from "../firebase";
export default {
    name: "sign-up",
    data: function() {
        return {
            login: "",
            password: "",
            passwordValid: "",
            name: ""
        };
    },
    computed: {
        comparePasswords() {
            if (this.password === this.passwordValid) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        signup: signUp
    }
};
</script>