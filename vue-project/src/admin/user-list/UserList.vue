<template>
    <!-- <div class="sign-in">
        <form v-on:submit.prevent="sign(login, password)" class="sign-in__form">
            <h3 class="sign-in__title">Sign in</h3>
            <input required v-model="login" type="email" placeholder="Login" class="sign-in__input" />
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
            <button class="sign-in__button button" :disabled="loading">Sign in</button>
        </form>
    </div>-->
    <main class="main">
        <section class="main__user-list">{{res}}</section>
    </main>
</template>

<style lang="scss">
@import "../../shared/components/button/button.css";
.main {
    &__user-list {
        width: 80%;
        max-width: 800px;
        display: block;
        border: 2px solid black;
        margin: 100px auto;
    }
}
</style>

<script>
let response;

export default {
    name: "users",
    data: function() {
        return {
            res: response
        };
    },
    methods: {
        async sign(...args) {
            try {
                this.$store.commit("setLoading", true);

                let res = await this.$root.auth.signIn(...args);

                this.$store.dispatch("setUser", res);
                this.$store.commit("setLoading", false);
            } catch (e) {
                alert(e);
                this.$store.commit("setLoading", false);
            }
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        }
    }
};
</script>