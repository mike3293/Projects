<template>
    <main class="user-list">
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
            <md-button class="md-raised" :md-ripple="false" @click="firstPage">First</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="prevPage">Previous</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="nextPage">Next</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="lastPage">Last</md-button>
        </div>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="showModal">Add user</md-button>

        <user-add v-show="isModalVisible" @close="closeModal(); refreshTable();" />
    </main>
</template>

<style lang="scss">
.user-list {
    &__table {
        text-align: left;
        // it's working
        width: 50%;
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

import "vue-material/dist/theme/default.css";

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
            isModalVisible: false
        };
    },
    async created() {
        const usersObj = await this.$root.users.getUsers(
            this.currentPage,
            this.pageSize
        );
        this.users = usersObj.array;
        this.currentPage = usersObj.page;
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
        sort(column) {
            if (column === this.currentSort) {
                this.currentSortDir =
                    this.currentSortDir === "asc" ? "desc" : "asc";
            }
            this.currentSort = column;
        },
        async firstPage() {
            this.currentPage = 1;
            const usersObj = await this.$root.users.getUsers(
                this.currentPage,
                this.pageSize
            );
            this.users = usersObj.array;
            this.currentPage = usersObj.page;
        },
        async nextPage() {
            this.currentPage++;
            const usersObj = await this.$root.users.getUsers(
                this.currentPage,
                this.pageSize
            );
            this.users = usersObj.array;
            this.currentPage = usersObj.page;
        },
        async prevPage() {
            if (this.currentPage > 1) this.currentPage--;
            const usersObj = await this.$root.users.getUsers(
                this.currentPage,
                this.pageSize
            );
            this.users = usersObj.array;
            this.currentPage = usersObj.page;
        },
        async lastPage() {
            const usersObj = await this.$root.users.getUsers(-1, this.pageSize);
            this.users = usersObj.array;
            this.currentPage = usersObj.page;
        },
        edit(user) {
            this.$router.push({ name: "edit", params: { user } });
        },
        del(user) {
            this.$root.users.deleteUser(user);
            this.users = this.users.filter(function(value) {
                return value != user;
            });
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async refreshTable() {
            // this.users = await this.$root.users.getUsers();
        }
    },
    computed: {
        // Make server side
        // sortedUsers() {
        //     //             this.users = await this.$root.users.getUsers(
        //     //     this.currentPage,
        //     //     this.pageSize
        //     // );
        //     // eslint-disable-next-line
        // }
    }
};
</script>