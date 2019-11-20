export default class UsersServices {
    #firebase = null;
    #resource = null;

    constructor(firebase, resource) {
        this.#firebase = firebase;
        this.#resource = resource;
    }


    async getUsers(lastUser, pageSize, action) {
        const usersArray = await this.#resource.get("/get", { lastUser, pageSize, action });
        return usersArray;
    }

    async deleteUser(user) {
        const firebase = this.#firebase;
        const id = `${user.id}`;

        await firebase.firestore()
            .collection("users")
            .doc(id)
            .delete();

        await this.#resource.post("/delete", { email: user.login });
    }

    async editUser(user) {
        const res = await this.#resource.post("/edit", { email: user.oldLogin, password: user.password, newEmail: user.login });

        const firebase = this.#firebase;
        const id = `${user.id}`;

        await firebase.firestore()
            .collection("users")
            .doc(id)
            .set({
                login: user.login,
                nickName: user.nickName,
                role: user.role
            }, { merge: true });
        return res;
    }

    async createUser(user) {
        await this.#resource.post("/add", { email: user.login, password: user.password });

        const firebase = this.#firebase;

        const currentDateUnix = (new Date()).valueOf();

        await firebase.firestore()
            .collection("users")
            .add({ login: user.login, role: user.role, createDate: currentDateUnix, nickName: user.nickName });

    }
}