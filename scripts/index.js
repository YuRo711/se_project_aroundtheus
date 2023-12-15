// #region Enable validation

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_deactivated",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
};

enableValidation();

// #endregion

// #region Initial cards

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
];

// #endregion

// #region Edit profile modal setup

const editModal = document.querySelector("#edit-modal")
const nameInput = editModal.querySelector(".modal__input_type_name");
const descInput = editModal.querySelector(".modal__input_type_description");
const nameText = document.querySelector(".profile__name");
const descText = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const editCloseButton = editModal.querySelector(".modal__close-button");
editProfileButton.addEventListener("click", openEditModal);
editCloseButton.addEventListener("click", closeModal.bind(event, editModal));

const editForm = document.forms["edit-form"];
editForm.addEventListener("submit", updateInfo);
editModal.addEventListener("click", (event) => handleOverlayClick(event, editModal));
document.addEventListener("keydown", (event) => handleKeyPress(event, editModal));

// #endregion 

// #region New place modal setup

const placeModal = document.querySelector("#place-modal")
const titleInput = placeModal.querySelector(".modal__input_type_title");
const imageInput = placeModal.querySelector(".modal__input_type_image");

const placeButton = document.querySelector(".profile__add-button");
const placeCloseButton = placeModal.querySelector(".modal__close-button");
placeButton.addEventListener("click", openModal.bind(event, placeModal));
placeCloseButton.addEventListener("click", closeModal.bind(event, placeModal));

const placeForm = document.forms["place-form"];
placeForm.addEventListener("submit", addCard);
placeModal.addEventListener("click", (event) => handleOverlayClick(event, placeModal));
document.addEventListener("keydown", (event) => handleKeyPress(event, placeModal));

// #endregion 

// #region Image modal setup

const imageModal = document.querySelector("#image-modal");
const openedImage = imageModal.querySelector(".modal__image");
const imageSubtitle = imageModal.querySelector(".modal__image-subtitle");
const imageCloseButton = imageModal.querySelector(".modal__close-button");
imageCloseButton.addEventListener("click", closeModal.bind(event, imageModal));
imageModal.addEventListener("click", (event) => handleOverlayClick(event, imageModal));
document.addEventListener("keydown", (event) => handleKeyPress(event, imageModal));

// #endregion

// #region Cards rendering

const cards = document.querySelector(".cards");
const cardTemplate = document.getElementById("card");
initialCards.forEach((data) => {
    const card = getCardElement(data);
    cards.append(card);
});

// #endregion 


// #region Universal modal methods

function openModal(modal)
{
    const formElement = modal.querySelector(config.formSelector);
    if (formElement) {
        const inputElements = Array.from(
            formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        toggleButtonState(inputElements, buttonElement);
    }
    modal.classList.add("modal_opened");
}

function closeModal(modal)
{
    const formElement = modal.querySelector(config.formSelector);
    if (formElement){
        const inputElements = Array.from(
            formElement.querySelectorAll(config.inputSelector));
        inputElements.forEach((inputElement) => hideInputError(formElement, inputElement));
    }
    modal.classList.remove("modal_opened");
}

function handleOverlayClick(event, modal)
{
    if (event.target === modal) {
        closeModal(modal);
    }
}

function handleKeyPress(event, modal)
{
    if (event.key === "Escape") {
        closeModal(modal);
    }
}

// #endregion


// #region Edit modal methods

function openEditModal() {
    fillProfileForm();
    openModal(editModal)
}

function fillProfileForm()
{
    nameInput.value = nameText.textContent;
    descInput.value = descText.textContent;
}

function updateInfo(event) {
    event.preventDefault();
    nameText.textContent = nameInput.value;
    descText.textContent = descInput.value;
    closeModal(editModal);
}

// #endregion 

// #region New place modal & card creation methods

function addCard(event) {
    event.preventDefault();
    const data = {
        name: titleInput.value,
        link: imageInput.value,
    };
    const card = getCardElement(data);
    cards.insertBefore(card, cards.firstChild);
    event.target.reset();
    closeModal(placeModal);
}

function getCardElement(data) {
    const name = data.name;
    const image = data.link;
    const card = cardTemplate.content.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    cardImage.setAttribute("src", image);
    cardImage.setAttribute("alt", name);
    cardTitle.textContent = name;
    card.querySelector(".card__like-button")
        .addEventListener("click",likeCard);
    card.querySelector(".card__delete-button")
        .addEventListener("click", deleteCard);
    card.querySelector(".card__image")
        .addEventListener("click", openCard);
    return card;
}

// #endregion 

// #region Card interaction methods

function likeCard(event)
{
    const button = event.target;
    button.classList.toggle("card__like-button_active");
}

function deleteCard(event)
{
    const button = event.target;
    const card = button.closest(".card");
    cards.removeChild(card)
}

function openCard(event)
{
    openModal(imageModal);
    const imageLink = event.target.getAttribute("src");
    const imageTitle = event.target.getAttribute("alt");
    openedImage.setAttribute("src", imageLink);
    openedImage.setAttribute("alt", imageTitle);
    imageSubtitle.textContent = imageTitle;
}

// #endregion 