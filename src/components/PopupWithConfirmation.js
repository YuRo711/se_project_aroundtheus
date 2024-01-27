import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(selector, confirmHandler) {
        super(selector);
        this._confirmHandler = confirmHandler;
    }

    setConfirmationData(data)
    {
        this._confirmationData = data;
    }

    setEventListeners() {
        const button = this._element.querySelector(".modal__save-button");
        button.addEventListener("click", (event) => {
            event.preventDefault();
            this._confirmHandler(this._confirmationData)
                .then(() => {
                    this.close();
            });
        });
        super.setEventListeners();
    }
}