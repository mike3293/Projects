export default class UsersServices {

    constructor(baseURL, getToken) {
        this.baseURL = baseURL;
        this.getToken = getToken;
    }


    async post(URL, obj) {
        await fetch(`${this.baseURL + URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
    }
}