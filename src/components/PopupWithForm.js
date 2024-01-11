import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { UserInfo } from "./UserInfo.js";

export class PopupWithForm extends Popup {
    constructor(selector) {
        super(selector);
        this.form = this._element.querySelector("form");
    }

    _getInputValues() {
        const inputFields = Array.from(this.form.querySelectorAll(".modal__input"));
        const data = {};
        inputFields.forEach((inputElement) => {
            const inputId = inputElement.getAttribute("id");
            const inputValue = inputElement.value;
            data[inputId] = inputValue;
        })
        return data;
    }

    setEventListeners(escHandler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._submitHandler(event, inputValues);
            this.close();
        });
        super.setEventListeners(escHandler);
    }

    setSubmitHandler(submitHandler) {
        this._submitHandler = submitHandler;
    }
}