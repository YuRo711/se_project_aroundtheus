export class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;
    }

    _checkInputValidity(formElement, inputElement)
    {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, 
                inputElement.validationMessage);
        }
        else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _findInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._options.errorClass);
    }

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = "";
    }

    enableValidation()
    {
        const forms = document.forms;
        for (const formElement of forms) {
            const inputFields = Array.from(
                formElement.querySelectorAll(this._options.inputSelector));
            const buttonElement = formElement
                .querySelector(this._options.submitButtonSelector);

            inputFields.forEach((inputElement) =>
                inputElement.addEventListener("input", 
                    () => {
                        this._checkInputValidity(formElement, inputElement);
                        this.toggleButtonState(inputFields, buttonElement);
                    }
            ));
        }
    }

    checkFormValidity(formElement) {
        const inputElements = Array.from(
            formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = formElement
            .querySelector(this._options.submitButtonSelector);
        this.toggleButtonState(inputElements, buttonElement);
    }

    toggleButtonState(inputList, buttonElement) {
        if (this._findInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this._options.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._options.inactiveButtonClass);
        }
    }
}