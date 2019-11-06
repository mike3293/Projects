<template>
    <div class="app">
        <div class="app__progress-bar">
            <md-progress-bar md-mode="indeterminate" v-if="loading"></md-progress-bar>
        </div>
        <nav class="nav">
            <!-- <router-link to="/home" class="nav__page-links" v-if="!showName">Test page with 4 pic</router-link> -->
            <router-link to="/about" class="nav__page-links">About</router-link>
            <router-link to="/" class="nav__page-links" v-if="!showName">Sign in</router-link>
            <router-link to="/admin/surveys" class="nav__page-links">in</router-link>
            <router-link
                to="/admin/users"
                @click.native="signOut()"
                class="nav__name"
                v-if="showName"
            >Log out</router-link>
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
    position: relative;
    &__progress-bar {
        width: 100%;
        position: absolute;
    }

    .nav {
        padding: 30px;
        text-align: right;
        text-decoration: underline;
        background-color: #efffaa;
        border-bottom: 2px solid;
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
}
</style>

<script>
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
        showName() {
            return this.$store.state.name;
        },
        loading() {
            return this.$store.state.loading;
        }
    }
};
</script>