// #region Import

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

// #endregion

// #region Enable validation

const options = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_deactivated",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
};
// #endregion

// #region Esc handler

const handleEscapeKey = function(event) {
    if (event.key === "Escape") {
        const modal = document.querySelector(".modal_opened");
        closeModal(modal);
    }
}

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
editProfileButton.addEventListener("click", openEditModal);

const editForm = document.forms["edit-form"];
editForm.addEventListener("submit", updateInfo);
editModal.addEventListener("mousedown", (event) => handleOverlayClick(event, editModal));

const editValidator = new FormValidator(options, editForm);
editValidator.enableValidation();

// #endregion 

// #region New place modal setup

const placeModal = document.querySelector("#place-modal")
const titleInput = placeModal.querySelector(".modal__input_type_title");
const imageInput = placeModal.querySelector(".modal__input_type_image");

const placeButton = document.querySelector(".profile__add-button");
placeButton.addEventListener("click", openPlaceModal);

const placeForm = document.forms["place-form"];
placeForm.addEventListener("submit", addCard);
placeModal.addEventListener("mousedown", (event) => handleOverlayClick(event, placeModal));

const placeValidator = new FormValidator(options, placeForm);
placeValidator.enableValidation();

// #endregion 

// #region Image modal setup

const imageModal = document.querySelector("#image-modal");
const openedImage = imageModal.querySelector(".modal__image");
const imageSubtitle = imageModal.querySelector(".modal__image-subtitle");
imageModal.addEventListener("mousedown", (event) => handleOverlayClick(event, imageModal));

// #endregion

// #region Close buttons setup

const closeButtons = document.querySelectorAll('.modal__close-button');

closeButtons.forEach((button) => {
  const closestModal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(closestModal));
});


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

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscapeKey);
}

function handleOverlayClick(event, modal) {
    if (event.target === modal) {
        closeModal(modal);
    }
}

// #endregion

// #region Edit modal methods

function openEditModal() {
    fillProfileForm();
    editValidator.checkFormValidity(editForm);
    openModal(editModal);
}

function fillProfileForm() {
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

function openPlaceModal() {
    placeValidator.checkFormValidity(placeForm);
    openModal(placeModal);
}

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
    const cardSelector = "card";
    const card = new Card(data, cardSelector, openCard);
    const cardElement = card.generateCard();
    return cardElement;
}

// #endregion 

// #region Card interaction methods

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