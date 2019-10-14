<template>
    <button type="submit">{{ msg }}</button>
</template>

<style lang="scss" scoped>
button {
    display: block;
    border-radius: 5px;
    background-color: white;
    font-size: 15px;
}
</style>

<script>
export default {
    name: "CommonButton",
    props: {
        msg: String
    }
};
</script>