import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this.form = this._element.querySelector("form");
        this._submitHandler = submitHandler;
        this._inputFields = 
            Array.from(this.form.querySelectorAll(".modal__input"));
        this._submitButton = this._element.querySelector(".modal__save-button");
        this._buttonText = this._submitButton.textContent;
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
            this._submitButton.textContent = "Saving...";
            const inputValues = this._getInputValues();
            this._submitHandler(event, inputValues)
                .then(() => { 
                    console.log(this._buttonText);
                    this._submitButton.textContent = this._buttonText;
                });
            this.close();
        });
        super.setEventListeners();
    }
}