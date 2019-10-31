export default class UsersServices {
    constructor(firebase, resource) {
        this.firebase = firebase;
        this.resource = resource;
    }


    async getUsers(page, pageSize) {
        const usersArray = await this.resource.get('/get', { page, pageSize });
        //alert(usersArray);
        page = usersArray.pop();
        //alert(page);
        return { array: usersArray, page };
    }

    async deleteUser(user) {
        await this.resource.post('/delete', { email: user.login });

        const firebase = this.firebase;
        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).delete();
    }

    async editUser(user) {
        const res = await this.resource.post('/edit', { email: user.oldLogin, password: user.password, newEmail: user.login });

        const firebase = this.firebase;
        const id = `${user.id}`;

        await firebase.firestore().collection("users").doc(id).set({
            login: user.login,
            nickName: user.nickName,
            role: user.role
        }, { merge: true });
        return res;
    }

    async createUser(user) {
        await this.resource.post('/add', { email: user.login, password: user.password });

        const firebase = this.firebase;

        const currentDateUnix = (new Date()).valueOf();

        firebase.firestore().collection('users').add({ login: user.login, role: user.role, createDate: currentDateUnix, surveys: 0, nickName: user.name });

    }
}