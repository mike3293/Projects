<template>
    <md-card class="question">
        <md-card-content>
            <div class="md-layout">
                <span>{{question.id}}.</span>
                <input class="question__label" v-model="question.label" v-if="mode != 'fixed'" />
                <span v-if="mode == 'fixed'">{{question.label}}</span>
            </div>
            <md-field>
                <label>Answer</label>
                <md-textarea v-model="question.answer" :md-autogrow="true"></md-textarea>
            </md-field>
            <md-card-actions class="question__actions">
                <md-button
                    :md-ripple="false"
                    @click="delQuestion(question.id)"
                    v-if="mode != 'fixed'"
                >Cancel</md-button>
            </md-card-actions>
        </md-card-content>
    </md-card>
</template>
<style lang="scss" scoped>
.md-card-content {
    padding-bottom: 3px !important;
}

.md-field {
    margin-bottom: 0;
}

.question {
    max-width: 400px;
    margin: 20px auto;
    padding: 0;
    span {
        font-size: 18px;
        &::before {
            content: "\00a0"; // Add space
        }
    }
    &__actions {
        margin: 3px;
        padding: 0;
    }
    &__label {
        margin-left: 5px;
    }
}
</style>
<script>
export default {
    name: "text-question",
    created() {
        if (this.mode == "fixed") {
            this.question.answer = "";
        }
    },
    props: {
        question: Object,
        mode: String
    },
    methods: {
        delQuestion(id) {
            this.$emit("delete", id);
        }
    }
};
</script>