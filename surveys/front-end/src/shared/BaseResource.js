export default class BaseResource {

    constructor(baseURL, getToken) {
        this.baseURL = baseURL;
        this.getToken = getToken;
    }

    async post(URL, obj) {
        const token = this.getToken();
        await fetch(`${this.baseURL + URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(obj)
        });
    }

    async get(URL, obj) {
        const token = this.getToken();
        const res = await fetch(`${this.baseURL + URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(obj)
        });
        return await res.json();
    }
}