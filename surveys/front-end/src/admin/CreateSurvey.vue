<template>
    <div class="builder">
        <md-field md-inline class="builder__survey-name">
            <label>Survey name</label>
            <md-input v-model="name"></md-input>
        </md-field>
        <transition-group name="fade">
            <div class="builder__question" :key="question.id" v-for="question in questions">
                <text-question :question="question" @delete="delQuestion" />
            </div>
        </transition-group>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="saveSurvey">Save</md-button>
        <md-button class="md-raised" :md-ripple="false" @click="addQuestion">Add question</md-button>
        <md-snackbar
            :md-position="'center'"
            :md-duration="3000"
            :md-active.sync="showSnackbar"
            md-persistent
        >
            <span>Add at least one question</span>
            <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
        </md-snackbar>
    </div>
</template>
<style lang="scss">
.builder {
    &__survey-name {
        margin: auto;
        width: 200px;
    }
}

.fade-enter-active {
    transition: opacity 0.5s;
}

.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
<script>
export default {
    name: "CreateSurvey",
    components: {
        TextQuestion: () => import("@/shared/components/survey/TextQuestion")
    },
    data() {
        return {
            questions: [],
            name: "",
            showSnackbar: false
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                id: this.questions.length,
                label: "",
                answer: ""
            });
        },
        async saveSurvey() {
            try {
                const atLeastOneQuestionExist = this.questions[0];
                if (atLeastOneQuestionExist) {
                    await this.$root.manageSurveys.saveSurvey(
                        this.name ? this.name : "DEFAULT",
                        this.questions,
                        this.$store.state.auth.email
                    );
                    this.questions = [];
                    this.name = "";
                } else {
                    this.showSnackbar = true;
                }
            } catch (e) {
                alert(e);
            }
        },
        delQuestion(questionId) {
            this.questions.splice(questionId, 1);
            for (let i = questionId; i < this.questions.length; i++) {
                this.questions[i].id -= 1;
            }
        }
    }
};
</script>