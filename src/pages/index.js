// #region Import

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { initialCards, options } from "../utils/constants.js";
import "./index.css";

// #endregion

// #region Handle Esc press

const handleEscClose = (event) => {
    if (event.key === "Escape") {
        // this.close() is not working, and the program sees "this" as the document
        // cound you please explain, is there some other way to implement this method?
        const openedPopup = document.querySelector(".modal_opened");
        openedPopup.classList.remove("modal_opened");
        document.removeEventListener("keydown", handleEscClose);
    }
}

// #endregion

// #region Form popup validation

const formValidators = {};
const popups = {};

function confiureFormModals(config, escHandler)
{
    const modalList = Array.from(document.querySelectorAll(".modal_is-form"));
    modalList.forEach((modal) => {
        const modalId = modal.id;
        const newPopup = new PopupWithForm(`#${modalId}`);
        newPopup.setEventListeners(escHandler);
        popups[modalId] = newPopup;

        const popupForm = newPopup.form;
        const newValidator = new FormValidator(config, popupForm);
        const formId = popupForm.getAttribute('name');
        newValidator.enableValidation();
        formValidators[formId] = newValidator;
    })
}

confiureFormModals(options, handleEscClose);

// #endregion

// #region Edit profile modal setup

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openEditModal);

const nameText = document.querySelector(".profile__name");
const descText = document.querySelector(".profile__description");
const nameInput = document.querySelector(".modal__input_type_name");
const descInput = document.querySelector(".modal__input_type_description");

popups["edit-modal"].setSubmitHandler(updateInfo);

// #endregion 

// #region New place modal setup

const newPlaceButton = document.querySelector(".profile__add-button");
newPlaceButton.addEventListener("click", openPlaceModal);

popups["place-modal"].setSubmitHandler(addCard);

// #endregion 

// #region Image modal setup

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners(handleEscClose);

// #endregion

// #region Cards rendering

const cards = document.querySelector(".cards");
const cardTemplate = document.getElementById("card");
initialCards.forEach((data) => {
    const card = getCardElement(data);
    cards.append(card);
});

// #endregion 


// #region Edit modal methods

function openEditModal() {
    fillProfileForm();
    const editPopup = popups["edit-modal"];
    editPopup.open();
    formValidators["edit-form"].toggleButtonState();
}

function fillProfileForm() {
    nameInput.value = nameText.textContent;
    descInput.value = descText.textContent;
}

function updateInfo(event, data) {
    nameText.textContent = data["name-input"];
    descText.textContent = data["description-input"];
}

// #endregion 

// #region New place modal & card creation methods

function openPlaceModal() {
    formValidators["place-form"].toggleButtonState();
    popups["place-modal"].open();
}

function addCard(event, data) {
    const cardData = {
        name: data["title-input"],
        link: data["url-input"],
    };
    const card = getCardElement(cardData);
    cards.insertBefore(card, cards.firstChild);
    event.target.reset();
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
    const imageLink = event.target.getAttribute("src");
    const imageTitle = event.target.getAttribute("alt");
    imageModal.open({
        name: imageTitle,
        link: imageLink
    })
}

// #endregion 