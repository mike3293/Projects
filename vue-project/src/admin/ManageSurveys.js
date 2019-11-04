export default class ManageSurveys {
    constructor(firebase) {
        this.firebase = firebase;
    }

    saveSurvey(name, questions) {
        const firebase = this.firebase;

        firebase.firestore().collection('surveys').add({ name: name, questions: questions });

    }
}