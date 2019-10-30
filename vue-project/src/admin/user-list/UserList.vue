<template>
    <!-- <div class="sign-in">
        <form v-on:submit.prevent="sign(login, password)" class="sign-in__form">
            <h3 class="sign-in__title">Sign in</h3>
            <input required v-model="login" type="email" placeholder="Login" class="sign-in__input" />
            <input
                required
                v-model="password"
                placeholder="Password"
                class="sign-in__input"
                type="password"
            />
            <div class="sign-in__links">
                <router-link to="/sign-up">Sign up</router-link>
                <router-link to="/">Password?</router-link>
            </div>
            <button class="sign-in__button button" :disabled="loading">Sign in</button>
        </form>
    </div>-->
    <main class="main">
        <table border class="main__user-list">
            <thead>
                <tr>
                    <th @click="sort('login')">Login</th>
                    <th @click="sort('nickName')">Nick</th>
                    <th @click="sort('role')">Role</th>
                    <th @click="sort('createDate')">Create at</th>
                    <th @click="sort('surveys')">Surveys</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="user.login" v-for="user in sortedUsers">
                    <td>{{user.login}}</td>
                    <td>{{user.nickName}}</td>
                    <td>{{user.role}}</td>
                    <td>{{dataToString(user.createDate)}}</td>
                    <td>{{user.surveys}}</td>
                    <td>
                        <button @click="edit(user)">edit</button>
                        <button @click="del(user)">del</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="main__nav">
            <button @click="firstPage">First</button>
            <button @click="prevPage">Previous</button>
            <button @click="nextPage">Next</button>
            <button @click="lastPage">Last</button>
        </div>
        <button @click="add()">Add user</button>
        <!-- debug: sort={{currentSort}}, dir={{currentSortDir}} -->
    </main>
</template>

<style lang="scss">
@import "../../shared/components/button/button.css";
.main {
    &__user-list {
        border-radius: 5px;
        margin: auto;
        width: 500px;
        height: 100px;
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
    &__nav {
        display: flex;
        margin: 10px;
        justify-content: center;
    }
}
</style>

<script>
export default {
    name: "users",
    data: function() {
        return {
            users: [],
            currentSort: "login",
            currentSortDir: "asc",
            pageSize: 3,
            currentPage: 1
        };
    },
    async created() {
        this.users = await this.$root.usersList.getUsers();
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
        firstPage() {
            this.currentPage = 1;
        },
        nextPage() {
            if (this.currentPage * this.pageSize < this.users.length)
                this.currentPage++;
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        lastPage() {
            this.currentPage = Math.ceil(this.users.length / this.pageSize);
        },
        edit(user) {
            this.$router.push({ name: "edit", params: { user } });
        },
        del(user) {
            const res = this.$root.resource;
            this.$root.usersList.deleteUser(user, res);
            this.users = this.users.filter(function(value) {
                return value != user;
            });
        }
    },
    computed: {
        sortedUsers() {
            // eslint-disable-next-line
            return this.users
                .sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === "desc") modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort])
                        return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort])
                        return 1 * modifier;
                    return 0;
                })
                .filter((row, index) => {
                    let start = (this.currentPage - 1) * this.pageSize;
                    let end = this.currentPage * this.pageSize;
                    if (index >= start && index < end) return true;
                });
        }
    }
};
</script>