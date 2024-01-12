// #region Import

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { 
    initialCards, 
    options, 
    initialName, 
    initialDesc 
} from "../utils/constants.js";
import "./index.css";

// #endregion

// #region Popup configuration

const formValidators = {};
const popups = {};

function confiureFormModal(modalId, submitHandler, config)
{
    const newPopup = new PopupWithForm(`#${modalId}`, submitHandler);
    newPopup.setEventListeners();
    popups[modalId] = newPopup;
    enablePopupValidation(newPopup, config);
}

function enablePopupValidation(popup, config)
{
    const popupForm = popup.form;
    const newValidator = new FormValidator(config, popupForm);
    const formId = popupForm.getAttribute('name');
    newValidator.enableValidation();
    formValidators[formId] = newValidator;
}

// #endregion

// #region Edit profile modal setup

confiureFormModal("edit-modal", updateInfo, options);

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openEditModal);

const nameInput = document.querySelector(".modal__input_type_name");
const descInput = document.querySelector(".modal__input_type_description");

const userInfo = new UserInfo(".profile__name", ".profile__description");

// #endregion 

// #region New place modal setup

confiureFormModal("place-modal", addCard, options);

const newPlaceButton = document.querySelector(".profile__add-button");
newPlaceButton.addEventListener("click", openPlaceModal);

// #endregion 

// #region Image modal setup

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

// #endregion

// #region Cards rendering

const cards = document.querySelector(".cards");

const cardsSection = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = getCardElement(data);
        cards.append(card);
    }
}, ".cards");

cardsSection.renderItems();

// #endregion 


// #region Edit modal methods

function openEditModal() {
    fillProfileForm();
    const editPopup = popups["edit-modal"];
    editPopup.open();
    formValidators["edit-form"].toggleButtonState();
}

function fillProfileForm() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    descInput.value = info.description;
}

function updateInfo(data) {
    userInfo.setUserInfo({
        name: data["name-input"],
        description: data["description-input"],
    });
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
    cardsSection.addItem(getCardElement(cardData));
    event.target.reset();
}

function getCardElement(data) {
    const cardSelector = "card";
    const card = new Card(data, cardSelector,
        () => { imageModal.open(data) });
    const cardElement = card.generateCard();
    return cardElement;
}

// #endregion 