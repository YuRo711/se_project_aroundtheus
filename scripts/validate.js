function enableValidation()
{
    const forms = document.forms;
    for (const formElement of forms) {
        const inputFields = Array.from(
            formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);

        inputFields.forEach((inputElement) =>
            inputElement.addEventListener("input", 
                () => {
                    checkInputValidity(formElement, inputElement);
                    toggleButtonState(inputFields, buttonElement);
        }));
    }
}

function checkInputValidity(formElement, inputElement)
{
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, 
            inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
}

function findInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}
  
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
}

function toggleButtonState(inputList, buttonElement) {
    if (findInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}