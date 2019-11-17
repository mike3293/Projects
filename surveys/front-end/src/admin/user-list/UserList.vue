<template>
    <main class="user-list" v-if="atLeastOneUserExist">
        <md-table class="user-list__table">
            <md-table-row>
                <md-table-head>Login</md-table-head>
                <md-table-head>Nick</md-table-head>
                <md-table-head>Role</md-table-head>
                <md-table-head>Create at</md-table-head>
                <md-table-head>
                    <div class="user-list__surveys">
                        Surveys
                        <br />created
                    </div>
                </md-table-head>
                <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row :key="user.login" v-for="user in users">
                <md-table-cell>{{user.login}}</md-table-cell>
                <md-table-cell>{{user.nickName}}</md-table-cell>
                <md-table-cell>{{user.role}}</md-table-cell>
                <md-table-cell>{{user.createDate | dateToString}}</md-table-cell>
                <md-table-cell>{{user.numberOfCreatedSurveys}}</md-table-cell>
                <md-table-cell>
                    <button @click="edit(user)">edit</button>
                    <button @click="deleteUser(user)">del</button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="user-list__pagination">
            <!-- <md-button class="md-raised" :md-ripple="false" @click="firstPage">First</md-button> -->
            <md-button class="md-raised" :md-ripple="false" @click="getPrevPage">Previous</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="getNextPage">Next</md-button>
            <!-- <md-button class="md-raised" :md-ripple="false" @click="lastPage">Last</md-button> -->
        </div>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="add">Add user</md-button>
        <user-manage v-show="isModalVisible" :user="userToEdit" @close="closeModal" />
    </main>
</template>

<style lang="scss" scoped>
@import "@/shared/colors.scss";

.user-list {
    max-width: 800px;
    margin: auto;
    &__table {
        text-align: left;
        margin: auto;
        th {
            border-bottom: 3px solid $dark-gold;
            padding: 5px;
        }
        td {
            padding: 5px;
        }

        tr:nth-child(odd) {
            background: white;
        }
        tr:nth-child(even) {
            background: $light-blue;
        }
    }
    &__pagination {
        display: flex;
        margin: 10px;
        justify-content: center;
    }

    &__surveys {
        max-width: 30px;
        line-height: 16px;
    }
}
</style>

<script>
import { dateToString } from "@/shared/TextFormatter";

export default {
    name: "UserList",
    components: {
        UserManage: () => import("./UserAdd")
    },
    data: function() {
        return {
            users: [],
            pageSize: 5,
            prevPageStart: [],
            isModalVisible: false,
            userToEdit: {
                login: null,
                role: null,
                oldLogin: null,
                nickName: null,
                id: null
            }
        };
    },
    async created() {
        await this.getFirstPage();
    },
    filters: {
        dateToString: dateToString
    },
    methods: {
        async getFirstPage() {
            try {
                this.$store.commit("setLoading", true);
                this.users = await this.$root.users.getUsers(
                    null,
                    this.pageSize,
                    "first"
                );
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async getNextPage() {
            try {
                this.$store.commit("setLoading", true);
                const firstUser = this.users[0];

                if (this.users[this.pageSize - 1]) {
                    const users = await this.$root.users.getUsers(
                        this.users[this.pageSize - 1].login,
                        this.pageSize,
                        "next"
                    );

                    if (users[0]) {
                        this.users = users;
                        this.prevPageStart.push(firstUser.login);
                    }
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async getPrevPage() {
            try {
                this.$store.commit("setLoading", true);
                if (this.prevPageStart[0]) {
                    this.users = await this.$root.users.getUsers(
                        this.prevPageStart.pop(),
                        this.pageSize,
                        "prev"
                    );
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        edit(user) {
            this.userToEdit = {
                login: user.login,
                role: user.role,
                oldLogin: user.login,
                nickName: user.nickName,
                id: user.id
            };
            this.isModalVisible = true;
        },
        async deleteUser(user) {
            try {
                this.$store.commit("setLoading", true);
                await this.$root.users.deleteUser(user);
                await this.refreshTable();
            } catch (e) {
                this.$store.commit("setLoading", false);
                alert(e);
            }
        },
        add() {
            this.isModalVisible = true;
            this.userToEdit = {
                login: null,
                role: null,
                oldLogin: null,
                nickName: null,
                id: null
            };
        },
        async closeModal() {
            this.isModalVisible = false;
            await this.refreshTable();
        },
        async refreshTable() {
            await this.getFirstPage();
        }
    },
    computed: {
        atLeastOneUserExist() {
            return this.users[0];
        }
    }
};
</script>