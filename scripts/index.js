// #region Enable validation

const options = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_deactivated",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
};

enableValidation(options);

// #endregion

// #region Esc handler

const handleKeyPress = function(event, modal) {
    if (event.key === "Escape") {
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
const editCloseButton = editModal.querySelector(".modal__close-button");
editProfileButton.addEventListener("click", openEditModal);
editCloseButton.addEventListener("mousedown", closeModal.bind(this, editModal));

const editForm = document.forms["edit-form"];
editForm.addEventListener("submit", updateInfo);
editModal.addEventListener("mousedown", (event) => handleOverlayClick(event, editModal));

// #endregion 

// #region New place modal setup

const placeModal = document.querySelector("#place-modal")
const titleInput = placeModal.querySelector(".modal__input_type_title");
const imageInput = placeModal.querySelector(".modal__input_type_image");

const placeButton = document.querySelector(".profile__add-button");
const placeCloseButton = placeModal.querySelector(".modal__close-button");
placeButton.addEventListener("click", openPlaceModal);
placeCloseButton.addEventListener("mousedown", closeModal.bind(this, placeButton));

const placeForm = document.forms["place-form"];
placeForm.addEventListener("submit", addCard);
placeModal.addEventListener("mousedown", (event) => handleOverlayClick(event, placeModal));

// #endregion 

// #region Image modal setup

const imageModal = document.querySelector("#image-modal");
const openedImage = imageModal.querySelector(".modal__image");
const imageSubtitle = imageModal.querySelector(".modal__image-subtitle");
const imageCloseButton = imageModal.querySelector(".modal__close-button");
imageCloseButton.addEventListener("mousedown", closeModal.bind(this, imageModal));
imageModal.addEventListener("mousedown", (event) => handleOverlayClick(event, imageModal));

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
    // How do I add an event listener with event AND modal arguments? I've been looking it up everywhere, genuinely can't understand.
    document.addEventListener("keydown", (event) => handleKeyPress(event, modal));
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", (event) => handleKeyPress(event, modal));
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
    checkFormValidity(editForm);
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
    checkFormValidity(placeForm);
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
    cardImage.addEventListener("click", openCard);
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