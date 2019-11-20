<template>
    <main class="surveys-list">
        <md-card class="survey surveys-list__survey" :key="survey.id" v-for="survey in surveys">
            <div class="survey__name">{{survey.name}}</div>
            <div class="survey__length">{{survey.questions.length}} questions</div>
            <md-button class="md-raised md-primary" :md-ripple="false" @click="pass(survey)">pass</md-button>
        </md-card>
    </main>
</template>

<style lang="scss" scoped>
.surveys-list {
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    &__survey {
        margin: 20px;
        min-width: 120px;
        display: block;
        border-radius: 5px;
        overflow-wrap: break-word;
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
export default {
    name: "SurveysList",
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
            this.$store.commit("common/setLoading", true);
            this.surveys = await this.$root.surveys.loadList();
            this.$store.commit("common/setLoading", false);
        },
        pass(survey) {
            this.$router.push({
                name: "survey",
                params: { survey },
                query: { id: survey.id }
            });
        }
    }
};
</script>