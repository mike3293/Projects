export default class BaseResource {

    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.getToken = token;
    }


    async post(URL, obj) {
        const token = this.getToken();
        obj.token = token;
        await fetch(`${this.baseURL + URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
    }
}