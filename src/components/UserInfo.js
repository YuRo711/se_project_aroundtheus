export class UserInfo {
    constructor(nameSelector, bioSelector) {
        this._nameSelector = nameSelector;
        this._bioSelector = bioSelector;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._nameSelector).textContent,
            description: document.querySelector(this._bioSelector).textContent
        }
    }

    setUserInfo(data) {
        document.querySelector(this._nameSelector)
            .textContent = data.name;
        document.querySelector(this._bioSelector)
            .textContent = data.description;
    }
}