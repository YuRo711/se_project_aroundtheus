import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(selector) {
        super(selector);
    }

    _handleEscClose(event) {
        super._handleEscClose(event);
    }

    _getInputValues() {

    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        const form = this._element.querySelector(".modal__form");
        form.addEventListener("submit", updateInfo);
        super.setEventListeners();
    }
}