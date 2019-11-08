<template>
    <div>
        <div class="md-title">Survey name: {{survey.name}}</div>
        <div v-if="noAnswers" class="warning">No answers from users</div>
        <div
            class="stats survey__question-stats"
            :key="question.id"
            v-for="question in survey.questions"
        >
            <md-card>
                <md-card-content>
                    <div class="stats__title">
                        <span>{{question.id}}.</span>
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
    max-width: 400px;
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
        max-width: 300px;
        text-align: left;
        display: block;
    }
}
</style>

<script>
// use Object.keys(answersPerUser) to get users
export default {
    name: "SurveyStats",
    props: ["survey"],
    data: function() {
        return {
            answersPerUser: [],
            users: [],
            noAnswers: true
        };
    },
    created() {
        this.getAnswers();
    },
    methods: {
        async getAnswers() {
            if (this.survey.answered != 0) {
                this.noAnswers = false;
                this.answersPerUser = await this.$root.manageSurveys.getSurveyStats(
                    this.survey.id
                );
                this.users = Object.keys(this.answersPerUser);
            }
        },
        currentAnswer(user, id) {
            return this.answersPerUser[user][id - 1].answer;
        }
    },
    computed: {}
};
</script>
