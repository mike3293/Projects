export default class UsersServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async getUsers() {
        const db = this.firebase.firestore();

        const Snapshot = await db.collection('users').get();

        const usersArray = [];

        for (let user of Snapshot.docs) {
            const data = user.data();
            data.id = user.id;
            usersArray.push(data);
        }

        return usersArray;
    }
    async deleteUser(user) {
        const firebase = this.firebase;

        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).delete();
        // TODO: 
        //axios.post(url, { email: user.login });
        this.$root.resource.post('/delete', { email: user.login });
        // await fetch("https://us-central1-vivid-cache-256107.cloudfunctions.net/delete", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email: user.login })
        // });
    }

    async editUser(user) {
        const firebase = this.firebase;

        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).set({
            login: user.login,
            nickName: user.nickName,
            role: user.role
        }, { merge: true });

        await fetch("https://us-central1-vivid-cache-256107.cloudfunctions.net/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: user.oldLogin, password: user.password, newEmail: user.login })
        });
    }
}