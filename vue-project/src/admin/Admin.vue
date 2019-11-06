<template>
    <div class="admin-panel">
        <div class="admin-panel__sidebar">
            <md-button
                class="md-raised admin-panel__link"
                :md-ripple="false"
                to="/admin/users"
            >Users</md-button>
            <md-button
                class="md-raised admin-panel__link"
                :md-ripple="false"
                to="/admin/create-survey"
            >Create survey</md-button>
        </div>

        <!-- <router-link to="/admin/users">users</router-link> -->
        <div class="admin-panel__content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">
.admin-panel {
    display: flex;
    &__sidebar {
        height: 500px;
        width: 160px;
        position: relative;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
        border-right: 2px solid;
        border-bottom: 2px solid;
    }
    // &__link {
    //     // stext-transform: uppercase;
    //     display: block;
    //     line-height: 40px;
    //     height: 40px;
    //     width: 100px;
    //     text-align: center;
    //     color: #fff;
    //     margin: auto;
    //     border: solid 1px;
    //     background-color: #56e480;
    //     border-color: #99caec;
    //     font-weight: 700;
    //     transition: background-color 0.2s;
    // }
    // &__link:hover {
    //     background-color: #48ec50;
    // }
    &__content {
        width: 100%;
    }
    &__link {
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
}
</style>

<script>
export default {
    name: "admin",
    data: function() {
        return {};
    }
};
</script>