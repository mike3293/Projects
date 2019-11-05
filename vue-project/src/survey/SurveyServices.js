export default class SurveyServices {
    constructor(firebase) {
        this.firebase = firebase;
    }

    async loadList() {
        const firebase = this.firebase;

        const snapshot = await firebase.firestore().collection('surveys').get();

        const surveysArray = [];

        for (let survey of snapshot.docs) {
            const data = survey.data();
            data.id = survey.id;
            surveysArray.push(data);
        }

        return surveysArray;
    }

    completeSurvey(surveyIn, user) {
        const firebase = this.firebase;

        const obj = {};
        obj[surveyIn.id] = surveyIn.questions;
        firebase.firestore().collection('answers').doc(user).set(obj, { merge: true });

    }
}