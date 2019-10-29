export default class AuthServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async signIn(email, password) {
        const firebase = this.firebase;
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const token = await firebase.auth().currentUser.getIdToken(true);

        const Snapshot = await firebase.firestore().collection('users').where("login", "==", email).limit(1).get();

        const currentDoc = Snapshot.docs[0];

        // const docRef = firebase.firestore().collection('users').doc(currentDoc.id);      // increment 'surveys' field
        // docRef.update({ surveys: firebase.firestore.FieldValue.increment(1) });

        const role = currentDoc.data().role;
        const nickName = currentDoc.data().nickName;

        return { email, role, nickName, token };
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
        const token = await firebase.auth().currentUser.getIdToken(true);

        const currentDateUnix = (new Date()).valueOf();

        firebase.firestore().collection('users').add({ login: email, role: "user", createDate: currentDateUnix, surveys: 0, nickName: name });

        // for (let i = 1; i < 10; i++) {           // add users
        //     await firebase.auth().createUserWithEmailAndPassword(`user${i}@user.com`, password);
        //     const currentDateUnix = (new Date()).valueOf();

        //     firebase.firestore().collection('users').add({ login: `user${i}@user.com`, role: "user", createDate: currentDateUnix, surveys: 0, nickName: `user${i}` });
        // }

        return { email, role: 'user', nickName: name, token };
    }
}