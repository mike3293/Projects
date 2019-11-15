<template>
    <div class="background">
        <div class="window">
            <header class="window__header">
                Add user
                <button type="button" class="btn-close" @click="close">x</button>
            </header>
            <section class="content window__content">
                <form v-on:submit.prevent="add({login, name, password, role})" class="form">
                    <input required v-model="name" placeholder="Name" class="form__input" />
                    <div class="form__errors"></div>
                    <input
                        required
                        v-model="login"
                        placeholder="Login (email)"
                        type="email"
                        class="form__input"
                    />
                    <div class="form__errors"></div>
                    <input
                        v-model.trim="$v.password.$model"
                        placeholder="Password"
                        class="form__input"
                    />
                    <div class="form__errors">
                        <p class="error" v-if="!$v.password.required">this field is required</p>
                        <p
                            class="error"
                            v-if="!$v.password.minLenght"
                        >password must have at least 6 letters.</p>
                    </div>
                    <br />
                    <select v-model="role">
                        <option>admin</option>
                        <option>user</option>
                    </select>
                    <button class="form__button" :disabled="isLoading || check">Add</button>
                </form>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/shared/colors.scss";

.background {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $blur-black;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.window {
    background: #ffffff;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    max-width: 400px;

    &__header {
        padding: 15px;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        font-size: 20px;
        justify-content: space-between;

        .btn-close {
            border: none;
            font-size: 20px;
            cursor: pointer;
            font-weight: bold;
            color: #4aae9b;
            background: transparent;
        }
    }

    &__content {
        position: relative;
        padding: 20px 0;
        min-width: 350px;
    }
}

.form {
    display: block;
    margin: auto;

    &__input {
        width: 80%;
    }

    &__button {
        margin: 10px auto;
    }

    &__errors {
        display: block;
        height: 20px;
        line-height: 20px;
        text-align: left;
        width: 80%;
        margin: auto;
    }

    .error {
        margin: 0;
        padding: 0;
        color: red;
    }
}
</style>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
    name: "UserAdd",

    methods: {
        close() {
            this.$emit("close");
            this.login = "";
            this.password = "";
            this.name = "";
            this.role = "";
        },
        async add(user) {
            try {
                this.$store.commit("setLoading", true);
                await this.$root.users.createUser(user);
                this.close();
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        }
    },
    data: function() {
        return {
            login: "",
            password: "",
            name: "",
            role: ""
        };
    },
    validations: {
        password: {
            required,
            minLenght: minLength(6)
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.common.isLoading
        }),
        check() {
            return this.$v.$anyError;
        }
    }
};
</script>