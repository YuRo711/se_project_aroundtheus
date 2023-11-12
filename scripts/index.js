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

const modal = document.querySelector(".modal");
const nameInput = document.querySelector(".modal__input_type_name");
const descInput = document.querySelector(".modal__input_type_description");
const nameText = document.querySelector(".profile__name");
const descText = document.querySelector(".profile__description");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);


const form = document.forms["modal-form"];
form.addEventListener("submit", updateInfo);


const cards = document.querySelector(".cards");
for(data of initialCards) {
    const card = getCardElement(data);
    cards.appendChild(card);
}



function openModal() {
    modal.classList.add("modal_opened");
    nameInput.value = nameText.textContent;
    descInput.value = descText.textContent;
}

function closeModal() {
    modal.classList.remove("modal_opened");
}

function updateInfo(event) {
    event.preventDefault();
    nameText.textContent = nameInput.value;
    descText.textContent = descInput.value;
    closeModal();
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
    return card;
}