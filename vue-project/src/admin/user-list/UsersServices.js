export default class UsersServices {
    constructor(firebase) {
        this.firebase = firebase;
    }


    async getUsers() {
        const firebase = this.firebase;
        await firebase.auth().signInWithEmailAndPassword("admin@admin.com", "123456");      // to del after implementing state observer

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