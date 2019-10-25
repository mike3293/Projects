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
                    <th>Nick</th>
                    <th>Login</th>
                    <th>Role</th>
                    <th>Create at</th>
                    <th>Surveys</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="user.login" v-for="user in users">
                    <td>{{user.nickName}}</td>
                    <td>{{user.login}}</td>
                    <td>{{user.role}}</td>
                    <td>{{(new Date(user.createDate)).getDate()}}.{{(new Date(user.createDate)).getMonth() + 1}}.{{(new Date(user.createDate)).getFullYear()}}</td>
                    <td>{{user.surveys}}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style lang="scss">
@import "../../shared/components/button/button.css";
.main {
    &__user-list {
        border-radius: 5px;
        margin: auto;

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
}
</style>

<script>
export default {
    name: "users",
    data: function() {
        return {
            users: []
        };
    },
    async created() {
        this.users = await this.$root.usersList.getUsers();
    }
};
</script>