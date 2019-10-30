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

    async deleteUser(user, res) {
        await res.post('/delete', { email: user.login });

        const firebase = this.firebase;
        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).delete();
    }

    async editUser(user, res) {
        await res.post('/edit', { email: user.oldLogin, password: user.password, newEmail: user.login });

        const firebase = this.firebase;
        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).set({
            login: user.login,
            nickName: user.nickName,
            role: user.role
        }, { merge: true });
    }

    async createUser(user, res) {
        await res.post('/add', { email: user.login, password: user.password });

        const firebase = this.firebase;

        const currentDateUnix = (new Date()).valueOf();

        firebase.firestore().collection('users').add({ login: user.login, role: user.role, createDate: currentDateUnix, surveys: 0, nickName: user.name });

    }
}