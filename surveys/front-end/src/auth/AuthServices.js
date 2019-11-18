export default class AuthServices {
    #firebase = null;

    constructor(firebase) {
        this.#firebase = firebase;
    }

    async checkSignInOnLoad() {
        const firebase = this.#firebase;

        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
                unsubscribe();
                if (user) {
                    const snapshot = await firebase.firestore().collection("users").where("login", "==", user.email).limit(1).get();

                    const userExist = snapshot.docs[0];
                    if (userExist) {
                        const currentData = snapshot.docs[0].data();

                        const role = currentData.role;
                        const nickName = currentData.nickName;
                        const token = await user.getIdToken(true);
                        resolve({
                            email: user.email,
                            role,
                            nickName,
                            token
                        });
                    }
                }
                reject("No auth, need sign in");

            });
        });
    }

    async signIn(email, password) {
        const firebase = this.#firebase;
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const token = await firebase.auth().currentUser.getIdToken(true);

        const Snapshot = await firebase.firestore().collection("users").where("login", "==", email).limit(1).get();

        const currentDoc = Snapshot.docs[0];
        const role = currentDoc.data().role;
        const nickName = currentDoc.data().nickName;

        return {
            email,
            role,
            nickName,
            token
        };
    }

    async signUp(email, password, name) {
        const firebase = this.#firebase;

        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const token = await firebase.auth().currentUser.getIdToken(true);

        const currentDateUnix = (new Date()).valueOf();

        firebase.firestore().collection("users").add({
            login: email,
            role: "user",
            createDate: currentDateUnix,
            nickName: name
        });

        return {
            email,
            role: "user",
            nickName: name,
            token
        };
    }

    async signOut() {
        await this.#firebase.auth().signOut();
    }
}