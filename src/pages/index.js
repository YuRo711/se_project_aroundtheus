// #region Import

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js"; 
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { 
    options, 
    domain,
    token,
} from "../utils/constants.js";
import "./index.css";
import { Popup } from "../components/Popup.js";

// #endregion

// #region Profile setup

const api = new Api({
    baseUrl: domain,
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  });

const userInfo = new UserInfo(".profile__name", ".profile__description");

setProfileInfo(".profile__image");

function setProfileInfo(avatarSelector)
{
    api.getProfileInfo()
        .then((res) => {
            const userData = {
                name: res.name,
                description: res.about,
            }
            userInfo.setUserInfo(userData);
            document.querySelector(avatarSelector)
                .setAttribute("src", res.avatar);
        });
}

// #endregion

// #region Popup configuration

const formValidators = {};

function confiureFormModal(modalId, submitHandler, config)
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

// #region Edit profile modal setup

const editPopup = confiureFormModal("edit-modal", updateInfo, options);

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", openEditModal);

const nameInput = document.querySelector(".modal__input_type_name");
const descInput = document.querySelector(".modal__input_type_description");

// #endregion 

// #region New place modal setup

const placePopup = confiureFormModal("place-modal", addCard, options);

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
    });

const deletePopup = new Popup("#confirm-modal");
deletePopup.setEventListeners();

let deleteHandler = () => {};
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", deleteHandler);

// #endregion


// #region Edit modal methods

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
    userInfo.setUserInfo(newInfo);
    api.editProfile({
        name: newInfo.name,
        about: newInfo.description
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
    deleteButton.removeEventListener("click", deleteHandler);
    deleteHandler = () => {
        deleteCard(event.target.closest(".card"), data);
    };
    deleteButton.addEventListener("click", deleteHandler);
}

async function addCard(event, data) {
    const cardData = {
        name: data["title-input"],
        link: data["url-input"],
    };
    cardsSection.addItem(getCardElement(cardData));

    api.addCard(cardData)
        .then();

    event.target.reset();
}

function deleteCard(cardElement, data) {
    cardElement.remove();
    api.deleteCard(data._id)
    deletePopup.close();
}

function likeCard(event, data) {
    const button = event.target;
    button.classList.toggle("card__like-button_active");
    if (data.isLiked) {
        api.unlikeCard(data._id);
        data.isLiked = false;
    } else {
        api.likeCard(data._id);
        data.isLiked = true;
    }
}

function getCardElement(data) {
    const cardSelector = "card";
    const card = new Card(data, cardSelector,
        () => { imageModal.open(data) },
        (event) => { openConfirmModal(event, data) },
        (event) => { likeCard(event, data) });
    const cardElement = card.generateCard();
    if (data.isLiked) {
        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton.classList.toggle("card__like-button_active");
    }
    return cardElement;
}

// #endregion 