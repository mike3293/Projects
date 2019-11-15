<template>
    <div class="background">
        <div class="window">
            <header class="window__header">
                Add user
                <button type="button" class="btn-close" @click="close">x</button>
            </header>
            <section class="content window__content">
                <slot></slot>
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
</style>

<script>
export default {
    name: "modal",
    props: {
        closeEvent: String
    },
    methods: {
        close() {
            this.$parent.$emit(this.closeEvent);
        }
    }
};
</script>