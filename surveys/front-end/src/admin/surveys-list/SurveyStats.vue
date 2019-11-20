<template>
    <div>
        <div class="md-title">Survey name: {{survey.name}}</div>
        <div v-if="noAnswersExist" class="warning">No answers from users</div>
        <div
            class="stats survey__question-stats"
            :key="question.id"
            v-for="(question, index) in survey.questions"
        >
            <md-card>
                <md-card-content>
                    <div class="stats__title">
                        <span>{{index + 1}}.</span>
                        <span>{{question.label}}</span>
                    </div>
                    <md-table class="stats__table">
                        <md-table-row>
                            <md-table-head>User</md-table-head>
                            <md-table-head>Answer</md-table-head>
                        </md-table-row>

                        <md-table-row :key="user" v-for="user in users">
                            <md-table-cell>{{user}}</md-table-cell>
                            <md-table-cell>{{currentAnswer(user, question.id)}}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
            </md-card>
        </div>
        <md-button class="md-raised" :to="{name:'surveys-list'}">Go to surveys list</md-button>
    </div>
</template>

<style lang="scss" scoped>
.warning {
    color: rgb(255, 208, 0);
}
.md-title {
    margin-top: 20px;
}
.survey__question-stats {
    max-width: 500px;
    margin: 20px auto;
}
.stats {
    &__title {
        font-size: 18px;
        text-align: left;
        span {
            &::before {
                content: "\00a0"; // Add space
            }
        }
    }
    &__table {
        display: block;
        max-width: 450px;
        text-align: left;
        display: block;
    }
}
</style>

<script>
export default {
    name: "SurveyStats",
    props: ["survey"],
    data: function() {
        return {
            answersPerUser: this.survey.answersForSurvey,
            users: Object.keys(this.survey.answersForSurvey)
        };
    },
    methods: {
        currentAnswer(user, id) {
            for (let answer of this.answersPerUser[user]) {
                if (answer.id === id) {
                    return answer.answer;
                }
            }
        }
    },
    computed: {
        noAnswersExist() {
            return !this.users[0];
        }
    }
};
</script>
