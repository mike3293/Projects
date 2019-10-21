import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export default class AuthServices {

    //database;
    // firebase;

    constructor() {

        const firebaseConfig = {
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

        this.database = firebase.firestore();
        firebase.auth().signOut();      //To fix

    }


    async signIn(email, password) {
        this.$store.commit('setLoading', true);
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);

            const rolesSnapshot = await this.database.collection('users').where("login", "==", email).get();

            const role = rolesSnapshot.docs[0].data().role;

            const nickName = firebase.auth().currentUser.displayName;

            this.$store.dispatch('setUser', { email, role, nickName });

            this.$store.commit('setLoading', false);


        }
        catch (e) {
            alert(e);
            this.$store.commit('setLoading', false);
        }

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
        this.$store.commit('setLoading', true);
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            var user = firebase.auth().currentUser;

            await user.updateProfile({
                displayName: name
            });

            this.database.collection('users').add({ login: email, role: "user" });

            this.$store.dispatch('setUser', { email, role: 'user', nickName: name });
            this.$store.commit('setLoading', false);
        }
        catch (e) {
            alert(e);
            this.$store.commit('setLoading', false);
        }
    }

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         store.dispatch('setUser', user.email);
    //     }
    // });

}