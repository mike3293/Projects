<template>
    <div class="sign-up">
        <form novalidate v-on:submit.prevent="validateUser" class="sign-up__form">
            <md-card>
                <md-card-header>
                    <div class="md-title">Sign up</div>
                </md-card-header>
                <input v-model="name" placeholder="Name" type="username" class="sign-up__input" />
                <div class="sign-up__errors">
                    <p
                        class="error"
                        v-if="!$v.name.required && getValidation('name')"
                    >this field is required</p>
                </div>
                <input
                    required
                    v-model="email"
                    placeholder="Email"
                    type="email"
                    class="sign-up__input"
                />
                <div class="sign-up__errors">
                    <div v-if="getValidation('email')">
                        <p class="error" v-if="!$v.email.required">The email is required</p>
                        <p class="error" v-if="!$v.email.email">Invalid email</p>
                    </div>
                </div>
                <input
                    v-model.trim="$v.password.$model"
                    placeholder="Password"
                    class="sign-up__input"
                    autocomplete="new-password"
                    type="password"
                />
                <div class="sign-up__errors">
                    <div v-if="getValidation('password')">
                        <p class="error" v-if="!$v.password.required">this field is required</p>
                        <p
                            class="error"
                            v-if="!$v.password.minLenght"
                        >password must have at least 6 letters.</p>
                    </div>
                </div>
                <input
                    v-model.trim="$v.repeatPassword.$model"
                    placeholder="Repeat password"
                    class="sign-up__input"
                    v-bind:class="{ notSame: !$v.repeatPassword.sameAsPassword && getValidation('repeatPassword') }"
                    type="password"
                />
                <div class="sign-up__errors">
                    <p
                        class="error"
                        v-if="!$v.repeatPassword.sameAsPassword && getValidation('repeatPassword')"
                    >not same</p>
                </div>

                <md-button
                    type="submit"
                    class="md-raised sign-up__button button"
                    :disabled="isLoading"
                >Sign up</md-button>
            </md-card>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import "@/shared/colors.scss";
.error {
    margin: 0;
    padding: 0;
    color: red;
}
.sign-up {
    &__form {
        max-width: 400px;
        display: block;
        margin: 100px auto;
    }

    &__input {
        width: 70%;
        border-radius: 5px;
        height: 25px;
    }

    &__links {
        margin: auto;
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
.notSame {
    border-color: $light-red;
}
</style>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
    name: "sign-up",
    data: function() {
        return {
            email: "",
            password: "",
            repeatPassword: "",
            name: ""
        };
    },
    validations: {
        name: {
            required
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLenght: minLength(6)
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs("password")
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.common.isLoading
        }),
        check() {
            return this.$v.$anyError;
        }
    },
    methods: {
        getValidation(fieldName) {
            const field = this.$v[fieldName];

            if (field) {
                return field.$invalid && field.$dirty;
            }
        },
        async validateUser() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                this.signUp(this.email, this.password, this.name);
            }
        },
        async signUp(...args) {
            try {
                this.$store.commit("common/setLoading", true);

                let res = await this.$root.auth.signUp(...args);

                this.$store.commit("auth/setUser", res);

                if (res.role === "admin") {
                    this.$router.push({ name: "users" });
                } else if (res.role === "user") {
                    this.$router.push({ name: "surveys" });
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("common/setLoading", false);
            }
        }
    }
};
</script>