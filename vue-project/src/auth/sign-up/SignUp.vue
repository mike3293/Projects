<template>
    <div class="sign-up">
        <form class="sign-up__form">
            <h3 class="sign-up__title">Sign up</h3>

            <input required v-model="Name" placeholder="Name" class="sign-up__input" />
            <input
                required
                v-model="login"
                placeholder="Login (email)"
                type="email"
                class="sign-up__input"
            />

            <input required v-model="password" placeholder="Password" class="sign-up__input" />
            <input
                required
                v-model="passwordValid"
                placeholder="Repeat password"
                class="sign-up__input"
            />

            <CommonButton msg="Sign up" class="sign-up__button" />
        </form>
    </div>
</template>

<style lang="scss">
.sign-up {
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
        margin-bottom: 20px;
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
}
</style>

<script>
import CommonButton from "../../shared/components/button/CommonButton.vue";
export default {
    name: "sign-up",
    components: {
        CommonButton
    }
};
</script>