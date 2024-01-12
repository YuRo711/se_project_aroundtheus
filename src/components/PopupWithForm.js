import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this.form = this._element.querySelector("form");
        this._submitHandler = submitHandler;
        this._inputFields = 
            Array.from(this.form.querySelectorAll(".modal__input"));
    }

    _getInputValues() {
        const data = {};
        this._inputFields.forEach((inputElement) => {
            const inputId = inputElement.getAttribute("id");
            const inputValue = inputElement.value;
            data[inputId] = inputValue;
        })
        return data;
    }

    setEventListeners() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._submitHandler(event, inputValues);
            this.close();
        });
        super.setEventListeners();
    }
}