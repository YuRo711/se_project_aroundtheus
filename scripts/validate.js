function enableValidation(options)
{
    const forms = document.forms;
    for (const formElement of forms) {
        const inputFields = Array.from(
            formElement.querySelectorAll(options.inputSelector));
        const buttonElement = formElement.querySelector(options.submitButtonSelector);

        inputFields.forEach((inputElement) =>
            inputElement.addEventListener("input", 
                () => {
                    checkInputValidity(formElement, inputElement, options);
                    toggleButtonState(inputFields, buttonElement, options);
        }));
    }
}

function checkInputValidity(formElement, inputElement, options)
{
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, 
            inputElement.validationMessage, options);
    }
    else {
        hideInputError(formElement, inputElement, options);
    }
}

function findInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
}
  
function hideInputError(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
}

function toggleButtonState(inputList, buttonElement, options) {
    if (findInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(options.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(options.inactiveButtonClass);
    }
}