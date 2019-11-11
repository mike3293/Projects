<template>
    <div class="sign-up">
        <form v-on:submit.prevent="signup(login, password, name)" class="sign-up__form">
            <h3 class="sign-up__title">Sign up</h3>
            <input required v-model="name" placeholder="Name" class="sign-up__input" />
            <div class="sign-up__errors"></div>
            <input
                required
                v-model="login"
                placeholder="Login (email)"
                type="email"
                class="sign-up__input"
            />
            <div class="sign-up__errors"></div>
            <input
                v-model.trim="$v.password.$model"
                placeholder="Password"
                class="sign-up__input"
                type="password"
            />
            <div class="sign-up__errors">
                <p class="error" v-if="!$v.password.required">this field is required</p>
                <p
                    class="error"
                    v-if="!$v.password.minLenght"
                >password must have at least 6 letters.</p>
            </div>
            <input
                v-model.trim="$v.passwordValid.$model"
                placeholder="Repeat password"
                class="sign-up__input"
                v-bind:class="{ notSame: !$v.passwordValid.sameAsPassword }"
                type="password"
            />
            <div class="sign-up__errors">
                <p class="error" v-if="!$v.passwordValid.sameAsPassword">not same</p>
            </div>

            <button class="sign-up__button button" :disabled="loading || check">Sign up</button>
        </form>
    </div>
</template>

<style lang="scss">
.error {
    margin: 0;
    padding: 0;
    color: red;
}
.sign-up {
    &__form {
        max-width: 380px;
        display: block;
        border: 2px solid black;
        margin: 100px auto;
    }

    &__title {
    }

    &__input {
        width: 70%;
        // margin-bottom: 20px;
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

    &__errors {
        display: block;
        height: 20px;
        line-height: 20px;
        text-align: left;
        width: 70%;
        margin: auto;
    }
}
.notSame {
    border-color: rgb(255, 131, 115);
}
</style>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";

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
    validations: {
        password: {
            required,
            minLenght: minLength(6)
        },
        passwordValid: {
            required,
            sameAsPassword: sameAs("password")
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        },
        check() {
            return this.$v.$anyError;
        }
    },
    methods: {
        async signup(...args) {
            try {
                this.$store.commit("setLoading", true);

                let res = await this.$root.auth.signUp(...args);

                this.$store.dispatch("setUser", res);
                this.$store.commit("setLoading", false);
            } catch (e) {
                alert(e);
                this.$store.commit("setLoading", false);
            }
        }
    }
};
</script>