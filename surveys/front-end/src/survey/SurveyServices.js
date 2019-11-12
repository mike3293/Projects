export default class SurveyServices {
    #firebase = null;

    constructor(firebase) {
        this.#firebase = firebase;
    }

    async loadList() {
        const firebase = this.#firebase;

        const snapshot = await firebase.firestore().collection("surveys").get();

        const surveysArray = [];

        for (let survey of snapshot.docs) {
            const data = survey.data();
            data.id = survey.id;
            surveysArray.push(data);
        }

        return surveysArray;
    }

    completeSurvey(surveyIn, login) {
        const firebase = this.#firebase;

        const obj = {};
        obj[login] = surveyIn.questions;
        firebase.firestore().collection("answers").doc(surveyIn.id).set(obj, { merge: true });

        firebase.firestore().collection("surveys").doc(surveyIn.id).update({ answered: firebase.firestore.FieldValue.increment(1) });
    }
}