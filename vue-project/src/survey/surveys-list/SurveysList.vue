<template>
    <main class="surveys-list">
        <div class="survey surveys-list__survey" :key="survey.id" v-for="survey in surveys">
            <div class="survey__name">{{survey.name}}</div>
            <div class="survey__length">{{survey.questions.length}} questions</div>
            <md-button class="md-raised md-primary" :md-ripple="false" @click="pass(survey)">pass</md-button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.surveys-list {
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    //justify-content: space-around;
    &__survey {
        margin: 20px;
        min-width: 120px;
        // margin-top: 30px;
        display: block;
        border: 1px solid;
        border-radius: 5px;
        // flex-wrap: wrap;
        // justify-content: space-around;
    }
}
.survey {
    &__name {
        margin: 10px 20px;
        max-width: 300px;
    }
}
</style>

<script>
/* eslint-disable */
import TextQuestion from "@/shared/components/survey/text-question/TextQuestion.vue";

export default {
    name: "SurveysList",
    components: {
        TextQuestion
    },
    data: function() {
        return {
            surveys: []
        };
    },
    async created() {
        await this.load();
    },
    methods: {
        async load() {
            this.$store.commit("setLoading", true);
            this.surveys = await this.$root.surveys.loadList();
            this.$store.commit("setLoading", false);
        },
        pass(survey) {
            this.$router.push({
                name: "survey",
                params: { survey }
            });
        }
    }
};
</script>