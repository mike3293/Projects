<template>
    <main class="user-list" v-if="users[0]">
        <md-table class="user-list__table">
            <md-table-row>
                <md-table-head @click="sort('login')">Login</md-table-head>
                <md-table-head @click="sort('nickName')">Nick</md-table-head>
                <md-table-head @click="sort('role')">Role</md-table-head>
                <md-table-head @click="sort('createDate')">Create at</md-table-head>
                <md-table-head @click="sort('surveys')">Surveys</md-table-head>
                <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row :key="user.login" v-for="user in users">
                <md-table-cell>{{user.login}}</md-table-cell>
                <md-table-cell>{{user.nickName}}</md-table-cell>
                <md-table-cell>{{user.role}}</md-table-cell>
                <md-table-cell>{{dataToString(user.createDate)}}</md-table-cell>
                <md-table-cell>{{user.surveys}}</md-table-cell>
                <md-table-cell>
                    <button @click="edit(user)">edit</button>
                    <button @click="del(user)">del</button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="user-list__pagination">
            <!-- <md-button class="md-raised" :md-ripple="false" @click="firstPage">First</md-button> -->
            <md-button class="md-raised" :md-ripple="false" @click="prevPage">Previous</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="nextPage">Next</md-button>
            <!-- <md-button class="md-raised" :md-ripple="false" @click="lastPage">Last</md-button> -->
        </div>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="showModal">Add user</md-button>
        <user-add v-show="isModalVisible" @close="closeModal(); refreshTable();" />
        <!-- <md-progress-bar md-mode="indeterminate" v-if="loading"></md-progress-bar> -->
    </main>
</template>

<style lang="scss">
.user-list {
    max-width: 800px;
    margin: auto;
    &__spinner {
        position: relative;
        overflow-x: auto;
        top: 0;
        left: 0;
    }
    &__table {
        text-align: left;
        // it's working
        // width: 80%;
        margin: auto;

        // height: 100px;
        border-collapse: collapse;

        th {
            border-bottom: 3px solid #8f7222;
            padding: 5px;
        }
        td {
            padding: 5px;
        }

        tr:nth-child(odd) {
            background: white;
        }
        tr:nth-child(even) {
            background: #bed3f3;
        }
    }
    &__pagination {
        display: flex;
        margin: 10px;
        justify-content: center;
    }
}
</style>

<script>
import UserAdd from "../user-add/UserAdd.vue";

export default {
    name: "users",
    components: {
        UserAdd
    },
    data: function() {
        return {
            users: [],
            pageSize: 5,
            currentPage: 1,
            prevStart: [],
            isModalVisible: false
        };
    },
    async created() {
        await this.firstPage();
    },
    methods: {
        dataToString(dateIn) {
            const date = new Date(dateIn);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            return `${day < 10 ? "0" + day : day}.${
                month < 10 ? "0" + month : month
            }.${date.getFullYear()}`;
        },
        async firstPage() {
            this.$store.commit("setLoading", true);
            this.users = await this.$root.users.getUsers(
                "first",
                this.pageSize
            );
            this.$store.commit("setLoading", false);
        },
        async nextPage() {
            this.$store.commit("setLoading", true);
            const firstUser = this.users[0];

            if (this.users[this.pageSize - 1]) {
                const users = await this.$root.users.getUsers(
                    this.users[this.pageSize - 1],
                    this.pageSize
                );

                if (users[0]) {
                    this.users = users;
                    this.prevStart.push(firstUser);
                }
            }
            this.$store.commit("setLoading", false);
        },
        async prevPage() {
            this.$store.commit("setLoading", true);
            if (this.prevStart[0]) {
                this.users = await this.$root.users.getUsers(
                    this.prevStart.pop(),
                    this.pageSize,
                    "prev"
                );
            }
            this.$store.commit("setLoading", false);
        },
        // async lastPage() {
        //     this.users = await this.$root.users.getUsers(
        //         this.users[this.pageSize - 1],
        //         this.pageSize,
        //         "last"
        //     );
        // },
        edit(user) {
            this.$router.push({ name: "edit", params: { user } });
            this.refreshTable();
        },
        del(user) {
            this.$root.users.deleteUser(user);
            this.users = this.users.filter(function(value) {
                return value != user;
            });
            this.refreshTable();
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async refreshTable() {
            this.firstPage();
        }
    }
    // computed: {
    //     loading() {
    //         return this.$store.state.loading;
    //     }
    // }
};
</script>