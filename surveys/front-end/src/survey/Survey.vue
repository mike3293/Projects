<template>
    <div class="survey">
        <div v-if="surveyIsLoaded">
            <div class="survey__name">Survey name: {{currentSurvey.name}}</div>
            <div
                class="survey__question"
                :key="question.id"
                v-for="(question, index) in currentSurvey.questions"
            >
                <text-question :index="index" :question="question" mode="fixed" />
            </div>
            <md-button class="md-raised" :md-ripple="false" :to="{name:'surveys'}">Go to list</md-button>
            <md-button class="md-raised md-accent" :md-ripple="false" @click="complete">Complete</md-button>
        </div>
        <md-snackbar
            :md-position="'center'"
            :md-active="!surveyIsGiven && !surveyIdIsGiven || IdIsincorrect"
            md-persistent
        >
            <span>Survey id is incorrect / not presented</span>
            <md-button class="md-primary" :to="{name:'surveys'}">Go to surveys list</md-button>
        </md-snackbar>
    </div>
</template>
<style lang="scss" scoped>
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
export default {
    name: "Survey",
    props: ["survey"],
    components: {
        TextQuestion: () => import("@/shared/components/survey/TextQuestion")
    },
    data: function() {
        return {
            currentSurvey: null,
            surveyIsLoaded: false,
            IdIsincorrect: false
        };
    },
    async created() {
        await this.getSurvey();
    },
    methods: {
        async getSurvey() {
            if (this.surveyIsGiven) {
                this.currentSurvey = this.survey;
                this.surveyIsLoaded = true;
            } else if (this.surveyIdIsGiven) {
                try {
                    this.$store.commit("common/setLoading", true);
                    this.currentSurvey = await this.$root.surveys.getSurvey(
                        this.$route.query.id
                    );
                    this.surveyIsLoaded = true;
                } catch (e) {
                    console.log(e);
                    this.IdIsincorrect = true;
                } finally {
                    this.$store.commit("common/setLoading", false);
                }
            }
        },
        complete() {
            try {
                this.$root.surveys.completeSurvey(
                    this.survey,
                    this.$store.state.auth.email
                );
                this.$router.push({ name: "surveys" });
            } catch (e) {
                alert(e);
            }
        }
    },
    computed: {
        surveyIsGiven() {
            return typeof this.survey != "undefined";
        },
        surveyIdIsGiven() {
            return typeof this.$route.query.id != "undefined";
        }
    }
};
</script>