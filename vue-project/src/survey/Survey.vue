<template>
    <div class="survey">
        <div class="survey__name">{{survey.name}}</div>
        <div class="survey__question" :key="question.id" v-for="question in survey.questions">
            <text-question :question="question" mode="fixed" />
        </div>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="complete">complete</md-button>
    </div>
</template>
<style lang="scss">
.survey {
    &__name {
        margin: 10px auto;
        font-size: 18px;
    }
}

.question-label {
    margin-left: 5px;
}
</style>
<script>
import TextQuestion from "@/shared/components/survey/text-question/TextQuestion.vue";
export default {
    name: "Survey",
    props: ["survey"],
    components: {
        TextQuestion
    },
    methods: {
        complete() {
            try {
                this.$root.surveys.completeSurvey(
                    this.survey,
                    this.$store.state.login
                );
                this.$router.push("surveys");
            } catch (e) {
                alert(e);
            }
        }
    }
};
</script>