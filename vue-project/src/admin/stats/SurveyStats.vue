<template>
    <div>hi {{name}}</div>
</template>

<script>
export default {
    name: "SurveyStats",
    props: ["survey"],
    data: function() {
        return {
            name: this.survey.name
        };
    }
};
</script>

<style>
</style>