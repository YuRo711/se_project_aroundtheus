let initialCards = [
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

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close-button");
let saveButton = document.querySelector(".modal__save-button");
editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
saveButton.addEventListener("click", updateInfo);

let modal = document.querySelector(".modal");
let inputFields = modal.querySelectorAll(".modal__input");
let nameInput = inputFields[0];
let descInput = inputFields[1];
let nameText = document.querySelector(".profile__name");
let descText = document.querySelector(".profile__description");

let cards = document.querySelector(".cards");
for(data of initialCards) {
    let card = getCardElement(data);
    cards.appendChild(card);
}



function openModal() {
    modal.classList.add("modal_opened");
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
    let name = data.name;
    let image = data.link;
    let template = document.getElementById("card");
    let card = template.content.cloneNode(true);
    card.querySelector(".card__image").setAttribute("src", image);
    card.querySelector(".card__title").textContent = name;
    return card;
}