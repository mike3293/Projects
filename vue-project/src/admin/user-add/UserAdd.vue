<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                Add user
                <button type="button" class="btn-close" @click="close">x</button>
            </header>
            <section class="modal-body">
                <form
                    v-on:submit.prevent="add({login, name, password, role})"
                    class="modal-body__form"
                >
                    <input required v-model="name" placeholder="Name" class="modal-body__input" />
                    <div class="modal-body__errors"></div>
                    <input
                        required
                        v-model="login"
                        placeholder="Login (email)"
                        type="email"
                        class="modal-body__input"
                    />
                    <div class="modal-body__errors"></div>
                    <input
                        v-model.trim="$v.password.$model"
                        placeholder="Password"
                        class="modal-body__input"
                    />
                    <div class="modal-body__errors">
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
                    <button class="modal-body__button button" :disabled="loading || check">Add</button>
                </form>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.modal-backdrop {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.modal {
    background: #ffffff;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    max-width: 380px;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    font-size: 20px;
    justify-content: space-between;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
    min-width: 300px;
}

.btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4aae9b;
    background: transparent;
}

.error {
    margin: 0;
    padding: 0;
    color: red;
}

.modal-body {
    &__form {
        display: block;
        margin: auto;
    }

    &__input {
        width: 70%;
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
    name: "user-add",

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
                const res = this.$root.resource;
                await this.$root.users.createUser(user, res);

                this.$store.commit("setLoading", false);
                this.close();
            } catch (e) {
                alert(e);
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
        loading() {
            return this.$store.state.loading;
        },
        check() {
            return this.$v.$anyError;
        },
        msg() {
            return this.user;
        }
    }
};
</script>