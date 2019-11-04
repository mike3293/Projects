<template>
    <div class="app">
        <nav class="nav">
            <!-- <router-link to="/home" class="nav__page-links" v-if="!showName">Test page with 4 pic</router-link> -->
            <router-link to="/about" class="nav__page-links">About</router-link>
            <router-link to="/" class="nav__page-links" v-if="!showName">Sign in</router-link>
            <router-link
                to="/admin/users"
                @click.native="signOut()"
                class="nav__name"
                v-if="showName"
            >Log out</router-link>
        </nav>
        <div class="app__progress-bar">
            <md-progress-bar md-mode="indeterminate" v-if="loading"></md-progress-bar>
        </div>
        <router-view />
        <footer />
    </div>
</template>

<style lang="scss">
@import "./variables.scss";

* {
    box-sizing: border-box;
}

body {
    margin: 0px;
}

.app {
    font-family: $avenir;
    text-align: center;
    color: #2c3e50;
    font-size: 16px;
    &__progress-bar {
        height: 5px;
    }
}

.nav {
    padding: 30px;
    text-align: right;
    text-decoration: underline;
    &__name {
        font-weight: bold;
        color: #205c99;
        margin-left: 10px;
    }

    &__page-links {
        font-weight: bold;
        color: #2c3e50;
        margin-left: 10px;

        &.router-link-exact-active {
            color: #42b983 !important;
        }
    }
}
</style>

<script>
export default {
    name: "app",
    methods: {
        async signOut() {
            await this.$root.auth.signOut();
            this.$store.dispatch("setUser", {
                email: null,
                nickName: null,
                role: null,
                token: null
            });
        }
    },
    computed: {
        comparePasswords() {
            if (this.password === this.passwordValid) {
                return false;
            } else {
                return true;
            }
        },
        showName() {
            return this.$store.state.name;
        },
        loading() {
            return this.$store.state.loading;
        }
    }
};
</script>