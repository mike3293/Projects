<template>
    <div class="app">
        <nav class="nav">
            <router-link to="/home" class="nav__page-links">Test page with 4 pic</router-link>
            <router-link to="/about" class="nav__page-links">About</router-link>
            <router-link to="/" class="nav__page-links" v-if="!showName">Sign in</router-link>
            <a class="nav__name">{{showName}}</a>
        </nav>
        <router-view />
        <footer />
    </div>
</template>

<style lang="scss">
@import "./variables.scss";

* {
    box-sizing: border-box;
    // text-decoration: none;
}

body {
    margin: 0px;
    font-size: 16px;
}

.app {
    font-family: $avenir;
    text-align: center;
    color: #2c3e50;
}

.nav {
    padding: 30px;
    text-align: right;
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
            color: #42b983;
        }
    }
}
</style>

<script>
export default {
    name: "app",
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
        }
    }
};
</script>