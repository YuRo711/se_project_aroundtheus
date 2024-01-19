export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    async _getJson(url) {
        return fetch(this._baseUrl + url, {
            headers: this._headers,
          })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .catch((err) => console.log("Error: " + err));
    }

    async _post(url, requestBody) {
        return fetch(this._baseUrl + url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(requestBody)
        })
            .then((res) => res.json())
            .catch((err) => console.log("Error: " + err));
    }

    async getProfileInfo() {
        return this._getJson("/users/me");
    }

    async getCards() {
        return this._getJson("/cards");
    }

    async addCard(cardData) {
        this._post("/cards", cardData)
    }

    async deleteCard(cardId) {
        return fetch(this._baseUrl + "/cards/" + cardId, {
            method: "DELETE",
            headers: this._headers,
        })
    }
}