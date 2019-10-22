import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export default class AuthServices {
    constructor() {
        const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE);
        firebase.initializeApp(firebaseConfig);
        firebase.auth().signOut();      //To fix

    }


    async signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const rolesSnapshot = await firebase.firestore().collection('users').where("login", "==", email).get();

        const role = rolesSnapshot.docs[0].data().role;

        const nickName = firebase.auth().currentUser.displayName;

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
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        var user = firebase.auth().currentUser;

        await user.updateProfile({
            displayName: name
        });

        firebase.firestore().collection('users').add({ login: email, role: "user" });

        return { email, role: 'user', nickName: name };
    }

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         store.dispatch('setUser', user.email);
    //     }
    // });

}