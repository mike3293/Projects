export default class UsersServices {

    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.token = token;
    }


    async post(URL, obj) {
        obj.token = this.token;
        alert(this.token);
        await fetch(`${this.baseURL + URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
    }
}