export default class ManageSurveys {
    #firebase = null;

    constructor(firebase) {
        this.#firebase = firebase;
    }

    async saveSurvey(name, questions, login) {
        const firebase = this.#firebase;
        firebase.firestore().collection("surveys").add({ name: name, questions: questions });

        const userDoc = await firebase.firestore().collection("users").where("login", "==", login).limit(1).get();
        const id = userDoc.docs[0].id;

        const docRef = firebase.firestore().collection("users").doc(id);
        docRef.update({ numberOfCreatedSurveys: firebase.firestore.FieldValue.increment(1) });     // increment "numberOfCreatedSurveys" field
    }

    async getSurveys(surveyPointer, pageSize, action) {
        const db = this.#firebase.firestore();

        const surveysArray = [];

        let snapshot;

        if (surveyPointer == null && action === "first") {
            snapshot = await db.collection("surveys").orderBy("__name__").limit(pageSize).get();
        }
        if (action === "prev") {
            snapshot = await db.collection("surveys").orderBy("__name__").startAt(surveyPointer.id).limit(pageSize).get();
        }
        if (action === "next") {
            snapshot = await db.collection("surveys").orderBy("__name__").startAfter(surveyPointer.id).limit(pageSize).get();
        }

        for (let survey of snapshot.docs) {
            const data = survey.data();
            data.id = survey.id;

            const answersSnapshot = await db.collection("answers").doc(survey.id).get();
            data.answersForSurvey = answersSnapshot.data() ? answersSnapshot.data() : 0;

            surveysArray.push(data);
        }
        return surveysArray;
    }

    async deleteSurvey(surveyIn) {
        const firebase = this.#firebase;
        await firebase.firestore().collection("answers").doc(surveyIn.id).delete();

        await firebase.firestore().collection("surveys").doc(surveyIn.id).delete();
    }

    async getSurveyStats(surveyId) {

        const db = this.#firebase.firestore();

        const snapshot = await db.collection("answers").doc(surveyId).get();

        return snapshot.data();
    }
}