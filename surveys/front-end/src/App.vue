<template>
    <div class="app">
        <div class="app__progress-bar">
            <md-progress-bar md-mode="indeterminate" v-if="loading"></md-progress-bar>
        </div>
        <nav class="nav">
            <router-link to="/about" class="nav__page-links" v-if="!showName">About</router-link>
            <router-link to="/" class="nav__page-links" v-if="!showName">Sign in</router-link>
            <router-link to="/" @click.native="signOut()" class="nav__name" v-if="showName">Sign out</router-link>
        </nav>
        <router-view />
        <footer />
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    margin: 0px;
}

.app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 16px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    &__progress-bar {
        width: 100%;
        position: absolute;
    }

    .nav {
        padding: 30px;
        text-align: right;
        text-decoration: underline;
        background-color: rgb(255, 152, 0);
        // border-bottom: 2px solid;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        &__name {
            font-weight: bold;
            margin-left: 10px;
        }

        &__page-links {
            font-weight: bold;
            margin-left: 10px;

            &.router-link-exact-active {
                color: #048b4f !important;
            }
        }
    }
}
</style>

<script>
import { mapState } from "vuex";

export default {
    name: "app",
    async created() {
        try {
            this.$store.commit("setLoading", true);
            const user = await this.$root.auth.checkSignIn();
            this.$store.dispatch("setUser", user);
        } catch (e) {
            console.log(e);
        } finally {
            this.$store.commit("setLoading", false);
        }
    },
    methods: {
        async signOut() {
            try {
                await this.$root.auth.signOut();
                this.$store.dispatch("setUser", {
                    email: null,
                    nickName: null,
                    role: null,
                    token: null
                });
            } catch (e) {
                alert(e);
            }
        }
    },
    computed: mapState({
        showName: state => state.name,
        loading: state => state.loading
    })
};
</script>