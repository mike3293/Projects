export default class UsersServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async getUsers() {
        const firebase = this.firebase;

        const Snapshot = await firebase.firestore().collection('users').get();
        // alert(Snapshot.docs[0].data());

        const usersArray = [];
        for (let user of Snapshot.docs) {
            usersArray.push(user.data());
        }

        return usersArray;
    }

    async editUser() {
        const firebase = this.firebase;

        const Snapshot = await firebase.firestore().collection('users').get();
        // alert(Snapshot.docs[0].data());

        const usersArray = [];
        for (let user of Snapshot.docs) {
            usersArray.push(user.data());
            //alert(user.data().role);
        }

        return usersArray;
    }
}