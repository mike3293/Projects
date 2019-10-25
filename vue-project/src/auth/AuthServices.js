export default class AuthServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async signIn(email, password) {
        const firebase = this.firebase;
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const Snapshot = await firebase.firestore().collection('users').where("login", "==", email).limit(1).get();

        const currentDoc = Snapshot.docs[0];

        // const docRef = firebase.firestore().collection('users').doc(currentDoc.id);      // increment 'surveys' field
        // docRef.update({ surveys: firebase.firestore.FieldValue.increment(1) });

        const role = currentDoc.data().role;

        const nickName = currentDoc.data().nickName;

        return { email, role, nickName };
    }



    // var provider = new firebase.auth.GoogleAuthProvider();

    // export const googleSignIn = function () {
    //     firebase.auth().signInWithPopup(provider).then(function (result) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //         // The signed-in user info.
    //         var user = result.user;
    //         // ...
    //         console.log(token + " " + user.email);
    //     });
    // }

    async signUp(email, password, name) {
        const firebase = this.firebase;

        await firebase.auth().createUserWithEmailAndPassword(email, password);

        //var user = firebase.auth().currentUser;

        // await user.updateProfile({
        //     displayName: name
        // });

        firebase.firestore().collection('users').add({ login: email, role: "user", createDate: Date(), surveys: 0, nickName: name });

        return { email, role: 'user', nickName: name };
    }
}