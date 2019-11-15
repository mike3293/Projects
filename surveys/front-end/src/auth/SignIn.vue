<template>
    <div class="sign-in">
        <form v-on:submit.prevent="signIn(login, password)" class="sign-in__form">
            <h3 class="sign-in__title">Sign in</h3>
            <input
                required
                v-model="login"
                autocomplete="username"
                type="email"
                placeholder="Email"
                class="sign-in__input"
            />
            <input
                required
                v-model="password"
                autocomplete="current-password"
                placeholder="Password"
                class="sign-in__input"
                type="password"
            />
            <div class="sign-in__links">
                <router-link to="/sign-up">Sign up</router-link>
                <router-link to="/">Password?</router-link>
            </div>
            <button class="sign-in__button button" :disabled="isLoading">Sign in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "../shared/components/button.css";
.sign-in {
    &__form {
        max-width: 380px;
        display: block;
        border: 2px solid black;
        margin: 100px auto;
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
import { mapState } from "vuex";
export default {
    name: "sign-in",
    data: function() {
        return {
            login: "",
            password: ""
        };
    },
    methods: {
        async signIn(...args) {
            try {
                this.$store.commit("setLoading", true);

                let res = await this.$root.auth.signIn(...args);

                this.$store.dispatch("setUser", res);
                if (res.role === "admin") {
                    this.$router.push({ name: "users" });
                } else if (res.role === "user") {
                    this.$router.push({ name: "surveys" });
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        }
    },
    computed: mapState({
        isLoading: state => state.common.isLoading
    })
};
</script>