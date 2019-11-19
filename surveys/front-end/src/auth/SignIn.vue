<template>
    <div class="sign-in">
        <form novalidate class="sign-in__form" @submit.prevent="validateUser">
            <md-card>
                <md-card-header>
                    <div class="md-title">Sign in</div>
                </md-card-header>

                <md-card-content class="md-layout md-alignment-center">
                    <input
                        autocomplete="username"
                        v-model="email"
                        :disabled="isLoading"
                        placeholder="Email"
                        class="sign-in__input"
                    />
                    <div class="sign-in__errors">
                        <div v-if="getValidation('email')">
                            <p class="error" v-if="!$v.email.required">The email is required</p>
                            <p class="error" v-if="!$v.email.email">Invalid email</p>
                        </div>
                    </div>
                    <input
                        v-model="password"
                        autocomplete="current-password"
                        placeholder="Password"
                        class="sign-in__input"
                        type="password"
                    />
                    <div class="sign-in__errors">
                        <div v-if="getValidation('password')">
                            <p class="error" v-if="!$v.password.required">this field is required</p>
                            <p
                                class="error"
                                v-if="!$v.password.minLenght"
                            >password must have at least 6 letters.</p>
                        </div>
                    </div>
                </md-card-content>

                <div class="sign-in__links">
                    <router-link to="/sign-up">Sign up</router-link>
                    <md-button
                        type="submit"
                        class="md-raised"
                        :disabled="isLoading"
                        :md-ripple="false"
                    >Sign in</md-button>
                </div>
            </md-card>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.error {
    margin: 0;
    padding: 0;
    color: red;
}
.sign-in {
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
        padding-bottom: 10px;
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
    name: "sign-in",
    data: function() {
        return {
            email: "",
            password: ""
        };
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLenght: minLength(6)
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
                this.signIn(this.email, this.password);
            }
        },
        async signIn(...args) {
            try {
                this.$store.commit("common/setLoading", true);

                let res = await this.$root.auth.signIn(...args);

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
    },
    computed: mapState({
        isLoading: state => state.common.isLoading
    })
};
</script>