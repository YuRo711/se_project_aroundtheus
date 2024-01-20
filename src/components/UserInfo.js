export class UserInfo {
    constructor(nameSelector, bioSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._bioSelector = bioSelector;
        this._avatarSelector = avatarSelector;
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
        if (data.avatar) {
            this.setUserAvatar(data.avatar)
        }
    }

    setUserAvatar(link) {
        document.querySelector(this._avatarSelector)
            .setAttribute("src", link);
    }
}