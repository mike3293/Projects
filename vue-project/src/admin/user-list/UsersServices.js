export default class UsersServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async getUsers() {
        const db = this.firebase.firestore();

        const Snapshot = await db.collection('users').get();
        // alert(Snapshot.docs[0].data());

        const usersArray = [];
        // const idArray = [];
        for (let user of Snapshot.docs) {
            const data = user.data();
            data.id = user.id;
            usersArray.push(data);
            // const login = user.data().login;
            // idArray.push({ id, login });
        }

        return usersArray;
    }

    async editUser(user) {
        const firebase = this.firebase;

        const id = `${user.id}`;


        //const UserAuth = await admin.auth().getUserByEmail(user.login);

        //alert(UserAuth);
        // admin.auth().updateUser(uid, {
        //     email: 'modifiedUser@example.com',
        //     phoneNumber: '+11234567890',
        //     emailVerified: true,
        //     password: 'newPassword',
        //     displayName: 'Jane Doe',
        //     photoURL: 'http://www.example.com/12345678/photo.png',
        //     disabled: true
        // })

        await firebase.firestore().collection("users").doc(id).set({
            login: user.login,
            nickName: user.nickName,
            role: user.role
        }, { merge: true });
    }
}