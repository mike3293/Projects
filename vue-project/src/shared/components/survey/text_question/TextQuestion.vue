<template>
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
    </md-card>
</template>
<style lang="scss">
</style>
<script>
export default {
    name: "text-question",
    props: {
        question: Object
    },
    methods: {
        delQuestion(id) {
            this.$emit("del", id);
        }
    }
};
</script>