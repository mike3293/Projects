<template>
    <main class="survey-list" v-if="surveys[0]">
        <md-table class="survey-list__table">
            <md-table-row>
                <md-table-head class="name">Name</md-table-head>
                <md-table-head>Answered</md-table-head>
                <md-table-head>Results</md-table-head>
                <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row :key="survey.id" v-for="survey in surveys" class="survey">
                <md-table-cell class="survey__name">{{survey.name}}</md-table-cell>
                <md-table-cell>{{survey.answered}}</md-table-cell>
                <md-table-cell>
                    <a @click.prevent="results(survey)" class="survey__results">results</a>
                </md-table-cell>
                <md-table-cell>
                    <div class="survey__actions">
                        <!-- <button @click="edit(user)">edit</button> -->
                        <button @click="del(survey)">del</button>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="survey-list__pagination">
            <md-button class="md-raised" :md-ripple="false" @click="prevPage">Previous</md-button>
            <md-button class="md-raised" :md-ripple="false" @click="nextPage">Next</md-button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.survey-list {
    max-width: 600px;
    margin: auto;
    &__table {
        text-align: left;
        margin: auto;
        th {
            border-bottom: 3px solid #8f7222;
            padding: 5px;
        }
        td {
            padding: 5px;
        }

        tr:nth-child(odd) {
            background: white;
        }
        tr:nth-child(even) {
            background: #bed3f3;
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
    name: "admin-surveys",
    data: function() {
        return {
            surveys: [],
            pageSize: 5,
            prevStart: []
        };
    },
    async created() {
        await this.firstPage();
    },
    methods: {
        results(survey) {
            this.$router.push({ name: "survey-results", params: { survey } });
        },
        async firstPage() {
            this.$store.commit("setLoading", true);
            this.surveys = await this.$root.manageSurveys.getSurveys(
                null,
                this.pageSize,
                "first"
            );
            this.$store.commit("setLoading", false);
        },
        async nextPage() {
            this.$store.commit("setLoading", true);
            const firstSurvey = this.surveys[0];

            if (this.surveys[this.pageSize - 1]) {
                const surveys = await this.$root.manageSurveys.getSurveys(
                    this.surveys[this.pageSize - 1],
                    this.pageSize,
                    "next"
                );

                if (surveys[0]) {
                    this.surveys = surveys;
                    this.prevStart.push(firstSurvey);
                }
            }
            this.$store.commit("setLoading", false);
        },
        async prevPage() {
            this.$store.commit("setLoading", true);
            if (this.prevStart[0]) {
                this.surveys = await this.$root.manageSurveys.getSurveys(
                    this.prevStart.pop(),
                    this.pageSize,
                    "prev"
                );
            }
            this.$store.commit("setLoading", false);
        },
        // edit(user) {
        //     this.$router.push({ name: "edit", params: { user } });
        // },
        async del(survey) {
            try {
                this.$store.commit("setLoading", true);
                await this.$root.manageSurveys.deleteSurvey(survey);
                await this.refreshTable();
            } catch (e) {
                this.$store.commit("setLoading", false);
                alert(e);
            }
        },
        async refreshTable() {
            await this.firstPage();
        }
    }
};
</script>