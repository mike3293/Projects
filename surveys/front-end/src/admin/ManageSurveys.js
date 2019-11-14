export default class ManageSurveys {
    #firebase = null;

    constructor(firebase) {
        this.#firebase = firebase;
    }

    async saveSurvey(name, questions, login) {
        this.#firebase.firestore().collection("surveys").add({ name: name, questions: questions, creator: login });
    }

    async getSurveys(surveyPointer, pageSize, action) {
        const db = this.#firebase.firestore();

        const surveysArray = [];

        let querry = db.collection("surveys").orderBy("__name__");

        if (action === "prev") {
            querry = querry.startAt(surveyPointer.id);
        }
        else if (action === "next") {
            querry = querry.startAfter(surveyPointer.id);
        }
        else if (!(surveyPointer == null && action === "first")) {
            throw Error("Invalid args");
        }

        const snapshot = await querry.limit(pageSize).get();

        for (let survey of snapshot.docs) {
            const data = survey.data();
            data.id = survey.id;

            const answersSnapshot = await db.collection("answers").doc(survey.id).get();
            data.answersForSurvey = answersSnapshot.data() ? answersSnapshot.data() : 0;

            surveysArray.push(data);
        }
        return surveysArray;
    }

    async deleteSurvey(surveyId) {
        const firebase = this.#firebase;
        await firebase.firestore().collection("answers").doc(surveyId).delete();
        await firebase.firestore().collection("surveys").doc(surveyId).delete();
    }

    async getSurveyStats(surveyId) {
        const db = this.#firebase.firestore();

        const snapshot = await db.collection("answers").doc(surveyId).get();

        return snapshot.data();
    }
}