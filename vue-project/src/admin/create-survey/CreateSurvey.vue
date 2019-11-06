<template>
    <div class="builder">
        <md-field md-inline class="builder__survey-name">
            <label>Survey name</label>
            <md-input v-model="name"></md-input>
        </md-field>
        <transition-group name="fade">
            <div class="builder__question" :key="question.id" v-for="question in questions">
                <text-question :question="question" @del="delQuestion" />
            </div>
        </transition-group>
        <md-button class="md-raised md-accent" :md-ripple="false" @click="saveSurvey">Save</md-button>
        <md-button class="md-raised" :md-ripple="false" @click="addQuestion">Add question</md-button>
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
import TextQuestion from "@/shared/components/survey/text-question/TextQuestion.vue";
export default {
    name: "CreateSurvey",
    components: {
        TextQuestion
    },
    data() {
        return {
            questions: [],
            name: ""
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                id: this.questions.length + 1,
                label: "",
                answer: ""
            });
        },
        async saveSurvey() {
            try {
                await this.$root.manageSurveys.saveSurvey(
                    this.name,
                    this.questions,
                    this.$store.state.login
                );
                this.questions = [];
                this.name = "";
            } catch (e) {
                alert(e);
            }
        },
        delQuestion(questionId) {
            this.questions.splice(questionId - 1, 1);
            for (let i = questionId - 1; i < this.questions.length; i++) {
                this.questions[i].id -= 1;
            }
        }
    }
};
</script>