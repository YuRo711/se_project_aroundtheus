export class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;
        this._buttonElement = formElement
            .querySelector(options.submitButtonSelector);
        this._inputFields = Array.from(
            formElement.querySelectorAll(options.inputSelector));
    }

    _checkInputValidity(inputElement)
    {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, 
                inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _findInvalidInput() {
        return this._inputFields.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement
            .querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement
            .querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = "";
    }

    enableValidation()
    {
        this._inputFields.forEach((inputElement) =>
            inputElement.addEventListener("input", 
                () => {
                    this._checkInputValidity(inputElement);
                    this.toggleButtonState();
                }
        ));
    }

    toggleButtonState() {
        if (this._findInvalidInput()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._options.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._options.inactiveButtonClass);
        }
    }
}