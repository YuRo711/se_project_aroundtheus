export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    async _request(url, method, requestBody) {
        return fetch(this._baseUrl + url, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(requestBody)
          })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            });
    }

    async getProfileInfo() {
        return this._request("/users/me", "GET");
    }

    async getCards() {
        return this._request("/cards", "GET");
    }

    async addCard(cardData) {
        return this._request("/cards", "POST", cardData);
    }

    async deleteCard(cardId) {
        return this._request("/cards/" + cardId, "DELETE");
    }

    async likeCard(cardId) {
        return this._request("/cards/" + cardId + "/likes", "PUT");
    }

    async unlikeCard(cardId) {
        return this._request("/cards/" + cardId + "/likes", "DELETE");
    }
    
    async editProfile(newInfo) {
        return this._request("/users/me", "PATCH", newInfo);
    }

    async updateAvatar(link) {
        return this._request("/users/me/avatar", "PATCH", { avatar: link });
    }
}