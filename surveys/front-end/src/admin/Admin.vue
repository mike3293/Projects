<template>
    <div>
        <md-app>
            <md-app-drawer md-permanent="full" :md-active="showMenu" class="admin-nav">
                <md-button
                    class="md-raised admin-nav__link"
                    :md-ripple="false"
                    to="/admin/users"
                >Users</md-button>
                <md-button
                    class="md-raised admin-nav__link"
                    :md-ripple="false"
                    to="/admin/create-survey"
                >Create survey</md-button>
                <md-button
                    class="md-raised admin-nav__link"
                    :md-ripple="false"
                    to="/admin/surveys"
                >Surveys List</md-button>
                <md-button
                    :md-ripple="false"
                    class="md-accent admin-nav__link hide"
                    @click="showMenu=false"
                >close</md-button>
            </md-app-drawer>

            <md-app-content>
                <md-button :md-ripple="false" class="hide" @click="showMenu=true">menu</md-button>
                <router-view />
            </md-app-content>
        </md-app>
    </div>
</template>

<style lang="scss" scoped>
.md-app {
    min-height: 565px;
    border: 1px solid rgba(#000, 0.12);
    border-top: none;
}

.md-drawer {
    width: 150px;
}
.admin-nav__link {
    width: 90%;
    text-transform: none;
    // font-weight: 500;
    font-size: 17px;
    margin: auto;
    margin-top: 20px;

    &.router-link-exact-active {
        color: #1f2eb3 !important;
        background-color: #f0db1c !important;
    }
}
.hide {
    display: none;
}

@media screen and (max-width: 600px) {
    .hide {
        display: initial;
    }
}
</style>

<script>
export default {
    name: "admin",
    data: function() {
        return {
            showMenu: false
        };
    }
};
</script>