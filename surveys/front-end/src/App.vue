<template>
    <div class="app">
        <div class="app__progress-bar">
            <md-progress-bar md-mode="indeterminate" v-if="isLoading"></md-progress-bar>
        </div>
        <nav class="nav">
            <router-link to="/about" class="nav__page-links" v-if="!showName">About</router-link>
            <router-link to="/" class="nav__page-links" v-if="!showName">Sign in</router-link>
            <router-link to="/" @click.native="signOut()" class="nav__name" v-if="showName">Sign out</router-link>
        </nav>
        <router-view v-if="appIsLoaded" />
        <footer />
    </div>
</template>

<style lang="scss">
@import "@/shared/colors.scss";
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
        background-color: $orange;
        box-shadow: 0 0 10px $blur-black;
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
    methods: {
        async signOut() {
            try {
                await this.$root.auth.signOut();
                this.$store.commit("setUser", {
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
        showName: state => state.auth.name,
        isLoading: state => state.common.isLoading,
        appIsLoaded: state => state.common.appIsLoaded
    })
};
</script>