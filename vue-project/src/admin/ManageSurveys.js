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
}