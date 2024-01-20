export class Card {
    constructor(data, cardSelector, handleImageClick, deleteHandler, likeHandler) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._deleteHandler = deleteHandler;
        this._likeHandler = likeHandler;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button")
            .addEventListener("click", this._likeHandler);
        this._element.querySelector(".card__delete-button")
            .addEventListener("click", this._deleteHandler);
        this._element.querySelector(".card__image")
            .addEventListener("click", this._handleImageClick);
    }

    generateCard() {
        const cardTemplate = document.getElementById(this._cardSelector);
        this._element = cardTemplate.content.cloneNode(true);
        this._likeButton = this._element.querySelector(".card__like-button");

        const name = this._data.name;
        const image = this._data.link;
        const cardImage = this._element.querySelector(".card__image");
        const cardTitle = this._element.querySelector(".card__title");
        cardImage.setAttribute("src", image);
        cardImage.setAttribute("alt", name);
        cardTitle.textContent = name;

        this._setEventListeners();
        return this._element;
    }

    likeCard() {
        this._likeButton.classList.toggle("card__like-button_active");
    }
}