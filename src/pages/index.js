// #region Import

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { 
    options, 
    domain,
    token,
} from "../utils/constants.js";
import "./index.css";

// #endregion

// #region Profile setup

const api = new Api({
    baseUrl: domain,
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  });

const userInfo = new UserInfo(".profile__name", ".profile__description", 
    ".profile__image");

setProfileInfo(".profile__image");

function setProfileInfo()
{
    api.getProfileInfo()
        .then((res) => {
            const userData = {
                name: res.name,
                description: res.about,
                avatar: res.avatar,
            }
            userInfo.setUserInfo(userData);
        })
        .catch((err) => {
            console.log("Error loading user info: " + err);
        });
}

// #endregion

// #region Popup configuration

const formValidators = {};

function configureFormModal(modalId, submitHandler, config)
{
    const newPopup = new PopupWithForm(`#${modalId}`, submitHandler);
    newPopup.setEventListeners();
    enablePopupValidation(newPopup, config);
    return newPopup;
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

// #region Edit profile & avatar modals setup

const editPopup = configureFormModal("edit-modal", updateInfo, options);
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openEditModal);

const nameInput = document.querySelector(".modal__input_type_name");
const descInput = document.querySelector(".modal__input_type_description");


const avatarPopup = configureFormModal("avatar-modal", updateAvatar, options);
const avatarElement = document.querySelector(".profile__avatar");
avatarElement.addEventListener("click", openAvatarModal);

// #endregion 

// #region New place modal setup

const placePopup = configureFormModal("place-modal", addCard, options);

const newPlaceButton = document.querySelector(".profile__add-button");
newPlaceButton.addEventListener("click", openPlaceModal);

// #endregion 

// #region Image modal setup

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

// #endregion

// #region Cards rendering

// Is there a better practice for defining a global variable inside a promise resolve?
let cardsSection = null;

api.getCards()
    .then((res) => {
        const cards = Array.from(res).reverse();
        
        cardsSection = new Section({
            items: cards,
            renderer: (data) => {
                const card = getCardElement(data);
                cardsSection.addItem(card);
            }
        }, ".cards");

        cardsSection.renderItems();
    })
    .catch((err) => {
        console.log("Error loading cards: " + err);
    });

const deletePopup = new PopupWithConfirmation("#confirm-modal", deleteCard);
deletePopup.setEventListeners();

// #endregion


// #region Edit & avatar modal methods

function openEditModal() {
    fillProfileForm();
    editPopup.open();
    formValidators["edit-form"].toggleButtonState();
}

function fillProfileForm() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    descInput.value = info.description;
}

async function updateInfo(event, data) {
    const newInfo = {
        name: data["name-input"],
        description: data["description-input"],
    };
    return api.editProfile({
        name: newInfo.name,
        about: newInfo.description
    })
        .then(() => {
            userInfo.setUserInfo(newInfo);
        })
        .catch((err) => {
            console.log("Error updating user info: " + err);
    });
}

function openAvatarModal() {
    avatarPopup.open();
    formValidators["avatar-form"].toggleButtonState();
}

async function updateAvatar(event, data) {
    const link = data["url-input"];

    return api.updateAvatar(link)
        .then(() => {
            userInfo.setUserAvatar(link);
        })
        .then(() => {
            event.target.reset();
        })
        .catch((err) => {
            console.log("Error updating avatar: " + err);
        });
    
}

// #endregion 

// #region New place modal & card methods

function openPlaceModal() {
    formValidators["place-form"].toggleButtonState();
    placePopup.open();
}

function openConfirmModal(event, data) {
    deletePopup.open();
    deletePopup.setConfirmationData({
        cardElement: event.target.closest(".card"),
        data: data,
    });
}

async function addCard(event, data) {
    const cardData = {
        name: data["title-input"],
        link: data["url-input"],
    };

    return api.addCard(cardData)
        .then((res) => {
            cardData._id = res._id;
            cardsSection.addItem(getCardElement(cardData));
        })
        .then(() => {
            event.target.reset();
        })
        .catch((err) => {
            console.log("Error adding a card: " + err);
        });
}

async function deleteCard({cardElement, data}) {
    return api.deleteCard(data._id)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log("Error deleting a card: " + err);
        });
}

async function likeCard(card) {
    api.likeCard(card.id)
        .then(() => {
            card.toggleLike();
        })
        .catch((err) => {
            console.log("Error liking a card: " + err);
    });
}

async function unlikeCard(card) {
    api.unlikeCard(card.id)
        .then(() => {
            card.toggleLike();
        })
        .catch((err) => {
            console.log("Error liking a card: " + err);
    });
}

function getCardElement(data) {
    const cardSelector = "card";
    const card = new Card(data, cardSelector,
        () => { imageModal.open(data) },
        (event) => { openConfirmModal(event, data) },
        likeCard, unlikeCard);
    const cardElement = card.generateCard();
    return cardElement;
}

// #endregion 