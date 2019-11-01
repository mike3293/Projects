<template>
    <div class="admin-panel">
        <div class="admin-panel__sidebar">
            <md-button class="md-raised admin-panel__b" :md-ripple="false" to="users">Users</md-button>
            <md-button
                class="md-raised admin-panel__b"
                :md-ripple="false"
                to="create-survey"
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
    justify-content: stretch;
    &__sidebar {
        height: 500px; /* Full-height: remove this if you want "auto" height */
        width: 160px; /* Set the width of the sidebar */
        position: relative; /* Fixed Sidebar (stay in place on scroll) */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        // background-color: rgb(221, 200, 200); /* Black */
        overflow-x: hidden; /* Disable horizontal scroll */
        //padding-top: 20px;
        border: 1px solid;
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
        margin: auto;
    }
    &__b {
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