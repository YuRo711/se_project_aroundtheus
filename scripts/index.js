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

// #region Edit modal setup

var editModal = document.querySelector("#edit-modal")
const nameInput = editModal.querySelector(".modal__input_type_name");
const descInput = editModal.querySelector(".modal__input_type_description");
const nameText = document.querySelector(".profile__name");
const descText = document.querySelector(".profile__description");

const editButton = document.querySelector(".profile__edit-button");
const editCloseButton = editModal.querySelector(".modal__close-button");
editButton.addEventListener("click", openEditModal);
editCloseButton.addEventListener("click", closeEditModal);

const editForm = document.forms["edit-form"];
editForm.addEventListener("submit", updateInfo);

// #endregion 

// #region New place modal setup

var placeModal = document.querySelector("#place-modal")
const titleInput = placeModal.querySelector(".modal__input_type_title");
const imageInput = placeModal.querySelector(".modal__input_type_image");

const placeButton = document.querySelector(".profile__add-button");
const placeCloseButton = placeModal.querySelector(".modal__close-button");
placeButton.addEventListener("click", openPlaceModal);
placeCloseButton.addEventListener("click", closePlaceModal);

const placeForm = document.forms["place-form"];
placeForm.addEventListener("submit", addCard);

// #endregion 

// #region Image modal setup

const imageModal = document.querySelector("#image-modal");
const openedImage = imageModal.querySelector(".modal__image");
const imageSubtitle = imageModal.querySelector(".modal__image-subtitle");
const imageCloseButton = imageModal.querySelector(".modal__close-button");
imageCloseButton.addEventListener("click", closeCard);

// #endregion 


// #region Cards rendering

const cards = document.querySelector(".cards");
initialCards.forEach((data) => {
    const card = getCardElement(data);
    cards.append(card);
});

// #endregion 


// #region Edit modal methods

function openEditModal() {
    editModal.classList.add("modal_opened");
    nameInput.value = nameText.textContent;
    descInput.value = descText.textContent;
}

function closeEditModal() {
    editModal.classList.remove("modal_opened");
}

function updateInfo(event) {
    event.preventDefault();
    nameText.textContent = nameInput.value;
    descText.textContent = descInput.value;
    closeEditModal();
}

// #endregion 

// #region New place modal & card creation methods

function openPlaceModal() {
    placeModal.classList.add("modal_opened");
}

function closePlaceModal() {
    placeModal.classList.remove("modal_opened");
}

function addCard(event) {
    event.preventDefault();
    const data = {
        name: titleInput.value,
        link: imageInput.value,
    };
    const card = getCardElement(data);
    cards.appendChild(card);
    closePlaceModal();
}

function getCardElement(data) {
    const name = data.name;
    const image = data.link;
    const template = document.getElementById("card");
    const card = template.content.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.setAttribute("src", image);
    cardImage.setAttribute("alt", name);
    card.querySelector(".card__title").textContent = name;
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
    if (button.classList.contains("card__like-button_active"))
    {
        button.classList.remove("card__like-button_active");
    } else {
        button.classList.add("card__like-button_active");
    }
}

function deleteCard(event)
{
    const button = event.target;
    const card = button.closest(".card");
    cards.removeChild(card)
}

function openCard(event)
{
    const imageLink = event.target.getAttribute("src");
    const imageTitle = event.target.getAttribute("alt");
    imageModal.classList.add("modal_opened");
    openedImage.setAttribute("src", imageLink);
    openedImage.setAttribute("alt", imageTitle);
    imageSubtitle.textContent = imageTitle;
}

function closeCard()
{
    imageModal.classList.remove("modal_opened");
}

// #endregion 