<template>
    <main class="survey-list" v-if="surveysIsLoaded">
        <md-table class="survey-list__table">
            <md-table-row>
                <md-table-head class="name">Name</md-table-head>
                <md-table-head>Answered</md-table-head>
                <md-table-head>Results</md-table-head>
                <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row :key="survey.id" v-for="survey in surveys" class="survey">
                <md-table-cell class="survey__name">{{survey.name}}</md-table-cell>
                <md-table-cell>{{nubmerOfUsersAnswers(survey)}}</md-table-cell>
                <md-table-cell>
                    <a @click.prevent="results(survey)" class="survey__results">results</a>
                </md-table-cell>
                <md-table-cell>
                    <div class="survey__actions">
                        <button @click="deleteSurvey(survey)">del</button>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="survey-list__pagination">
            <md-button class="md-raised" :md-ripple="false" @click="getPrevPage">Previous</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="getNextPage">Next</md-button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@import "@/shared/colors.scss";
.survey-list {
    max-width: 600px;
    margin: auto;
    &__table {
        text-align: left;
        margin: auto;
        th {
            border-bottom: 3px solid $dark-gold;
            padding: 5px;
        }
        td {
            padding: 5px;
        }

        tr:nth-child(odd) {
            background: white;
        }
        tr:nth-child(even) {
            background: $light-blue;
        }
    }
    &__pagination {
        display: flex;
        margin: 10px;
        justify-content: center;
    }
}
.survey {
    &__results {
        cursor: pointer;
    }

    &__name {
        max-width: 250px;
        overflow-wrap: break-word;
    }

    &__actions {
        display: inline-flex;

        button {
            margin-right: 5px;
        }
    }
}
</style>

<script>
export default {
    name: "AdminSurveys",
    data: function() {
        return {
            surveys: [],
            pageSize: 5,
            prevPageStart: []
        };
    },
    async created() {
        await this.getFirstPage();
    },
    methods: {
        results(survey) {
            this.$router.push({ name: "survey-results", params: { survey } });
        },
        async getFirstPage() {
            try {
                this.$store.commit("setLoading", true);
                this.surveys = await this.$root.manageSurveys.getSurveys(
                    null,
                    this.pageSize,
                    "first"
                );
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async getNextPage() {
            try {
                this.$store.commit("setLoading", true);
                const firstSurvey = this.surveys[0];
                const pageIsFull = this.surveys[this.pageSize - 1];

                if (pageIsFull) {
                    const surveys = await this.$root.manageSurveys.getSurveys(
                        this.surveys[this.pageSize - 1],
                        this.pageSize,
                        "next"
                    );
                    const atLeastOneSurveyExist = surveys[0];

                    if (atLeastOneSurveyExist) {
                        this.surveys = surveys;
                        this.prevPageStart.push(firstSurvey);
                    }
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async getPrevPage() {
            try {
                this.$store.commit("setLoading", true);
                const IsNotFirstPage = this.prevPageStart[0];

                if (IsNotFirstPage) {
                    this.surveys = await this.$root.manageSurveys.getSurveys(
                        this.prevPageStart.pop(),
                        this.pageSize,
                        "prev"
                    );
                }
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async deleteSurvey(survey) {
            try {
                this.$store.commit("setLoading", true);
                await this.$root.manageSurveys.deleteSurvey(survey.id);
                await this.refreshTable();
            } catch (e) {
                alert(e);
            } finally {
                this.$store.commit("setLoading", false);
            }
        },
        async refreshTable() {
            await this.getFirstPage();
        },
        nubmerOfUsersAnswers(survey) {
            return Object.keys(survey.answersForSurvey).length;
        }
    },
    computed: {
        surveysIsLoaded() {
            return this.surveys[0];
        }
    }
};
</script>