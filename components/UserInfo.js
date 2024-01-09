export class UserInfo {
    constructor(nameSelector, bioSelector) {
        this._nameSelector = nameSelector;
        this._bioSelector = bioSelector;
    }

    getUserInfo() {
        return {
            name: document.querySelector(nameSelector).textContent,
            description: document.querySelector(bioSelector).textContent
        }
    }

    setUserInfo(data) {
        document.querySelector(nameSelector).textContent = data.name;
        document.querySelector(bioSelector).textContent = data.description;
    }
}