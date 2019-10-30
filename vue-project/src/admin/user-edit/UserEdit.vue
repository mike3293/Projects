<template>
    <div class="edit-user">
        <form
            v-on:submit.prevent="edit({login, nickName: name, password, role, id, oldLogin})"
            class="edit-user__form"
        >
            <h3 class="edit-user__title">Edit user</h3>
            <input required v-model="name" placeholder="Name" class="edit-user__input" />
            <div class="edit-user__errors"></div>
            <input
                required
                v-model="login"
                placeholder="Login (email)"
                type="email"
                class="edit-user__input"
            />
            <div class="edit-user__errors"></div>
            <input
                v-model.trim="$v.password.$model"
                placeholder="Password"
                class="edit-user__input"
            />
            <div class="edit-user__errors">
                <p class="error" v-if="!$v.password.required">this field is required</p>
                <p
                    class="error"
                    v-if="!$v.password.minLenght"
                >password must have at least 6 letters.</p>
            </div>
            <select v-model="role">
                <option>admin</option>
                <option>user</option>
            </select>
            <button class="edit-user__button button" :disabled="loading || check">update</button>
        </form>
        <div>{{msg}}</div>
    </div>
</template>

<style lang="scss">
.error {
    margin: 0;
    padding: 0;
    color: red;
}
.edit-user {
    &__form {
        width: 35%;
        max-width: 400px;
        display: block;
        border: 2px solid black;
        margin: 100px auto;
    }

    &__title {
    }

    &__input {
        width: 70%;
        // margin-bottom: 20px;
    }
    &__links {
        margin: auto;
        margin-bottom: 5px;
        width: 70%;
        display: flex;
        justify-content: space-between;
    }

    &__button {
        margin: 10px auto;
    }

    &__errors {
        display: block;
        height: 20px;
        line-height: 20px;
        text-align: left;
        width: 70%;
        margin: auto;
    }
}
</style>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
    name: "edit",
    props: ["user"],
    data: function() {
        return {
            login: this.user.login,
            password: "",
            name: this.user.nickName,
            role: this.user.role,
            id: this.user.id,
            oldLogin: this.user.login
        };
    },
    validations: {
        password: {
            required,
            minLenght: minLength(6)
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        },
        check() {
            return this.$v.$anyError;
        },
        msg() {
            return this.user;
        }
    },
    methods: {
        async edit(user) {
            try {
                this.$store.commit("setLoading", true);
                const res = this.$root.resource;
                await this.$root.usersList.editUser(user, res);

                this.$store.commit("setLoading", false);
                this.$router.push("./");
            } catch (e) {
                alert(e);
                this.$store.commit("setLoading", false);
            }
        }
    }
};
</script>