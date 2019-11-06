export default class ManageSurveys {
    constructor(firebase) {
        this.firebase = firebase;
    }

    async saveSurvey(name, questions, login) {
        const firebase = this.firebase;
        console.log(login);
        firebase.firestore().collection('surveys').add({ name: name, questions: questions });

        const userDoc = await firebase.firestore().collection('users').where("login", "==", login).limit(1).get();
        const id = userDoc.docs[0].id;
        console.log(id);
        const docRef = firebase.firestore().collection('users').doc(id);      // increment 'surveys' field
        docRef.update({ surveys: firebase.firestore.FieldValue.increment(1) });
    }

    async getSurveys(userPointer, pageSize, action) {

        const db = this.firebase.firestore();

        const surveysArray = [];

        let snapshot;

        if (userPointer == null && action === "first") {
            snapshot = await db.collection('surveys').orderBy("name").limit(pageSize).get();
        }
        else {
            snapshot = await db.collection('surveys').orderBy("name").startAfter(userPointer).limit(pageSize).get();
        }

        if (action === "prev") {
            snapshot = await db.collection('surveys').orderBy("name").startAt(userPointer).limit(pageSize).get();
        }

        for (let survey of snapshot.docs) {
            const data = survey.data();
            data.id = survey.id;
            surveysArray.push(data);
        }

        return surveysArray;
    }

    deleteSurvey(surveyIn) {
        const firebase = this.firebase;
        firebase.firestore().collection('answers').doc(surveyIn.id).delete();

        firebase.firestore().collection('surveys').doc(surveyIn.id).delete();
    }
}