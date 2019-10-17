import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBmRjQ9JTGRhqF9nTRiMDNHELipbsm5y3o",
    authDomain: "vivid-cache-256107.firebaseapp.com",
    databaseURL: "https://vivid-cache-256107.firebaseio.com",
    projectId: "vivid-cache-256107",
    storageBucket: "vivid-cache-256107.appspot.com",
    messagingSenderId: "240625381905",
    appId: "1:240625381905:web:9c7b39efef4198d832f7b0",
    measurementId: "G-0ZX38ZPZ5H"
};

firebase.initializeApp(firebaseConfig);

// firebase
//   .auth()
//   .createUserWithEmailAndPassword("m@gmail.com", "123456");
// .catch(function (error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

export const signIn = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this.$router.push('/admin');
    }).catch((err) => alert(err));
    console.log("in");
}

var provider = new firebase.auth.GoogleAuthProvider();

// eslint-disable-next-line no-unused-vars
const googleSignIn = function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token + " " + user.email);
    });
}