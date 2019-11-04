<template>
    <div class="builder">
        <md-field md-inline class="builder__survey-name">
            <label>Survey name</label>
            <md-input v-model="name"></md-input>
        </md-field>
        <transition-group name="fade">
            <div class="builder__question" :key="question.id" v-for="question in questions">
                <md-card class="card">
                    <md-card-content>
                        <div class="md-layout">
                            <span>{{question.id}}.</span>
                            <input class="question-label" v-model="question.label" />
                        </div>
                        <md-field>
                            <label>Answer</label>
                            <md-textarea v-model="question.answer"></md-textarea>
                        </md-field>
                        <md-card-actions class="card__actions">
                            <!-- <md-button :md-ripple="false">Save</md-button> -->
                            <md-button :md-ripple="false" @click="delQuestion(question.id)">Cancel</md-button>
                        </md-card-actions>
                    </md-card-content>

                    <!-- <md-card-actions>
                    <md-button>Action</md-button>
                    <md-button>Action</md-button>
                    </md-card-actions>-->
                </md-card>
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
.md-card-content {
    padding-bottom: 3px !important;
}

.md-field {
    margin-bottom: 0;
}

.card {
    max-width: 400px;
    margin: 20px auto;
    padding: 0;
    span {
        font-size: 18px;
    }
    &__actions {
        margin: 3px;
        padding: 0;
    }
}

.question-label {
    margin-left: 5px;
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
        saveSurvey() {
            try {
                this.$root.manageSurveys.saveSurvey(this.name, this.questions);
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