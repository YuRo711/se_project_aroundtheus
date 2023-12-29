export class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button")
            .addEventListener("click", this._likeHandler);
        this._element.querySelector(".card__delete-button")
            .addEventListener("click", this._deleteHandler);
        this._element.querySelector(".card__image")
            .addEventListener("click", this._handleImageClick);
    }

    _deleteHandler(event) {
        cards.removeChild(this._element);
    }

    _likeHandler(event) {
        const button = event.target;
        button.classList.toggle("card__like-button_active");
    }

    generateCard() {
        const cardTemplate = document.getElementById(this._cardSelector);
        this._element = cardTemplate.content.cloneNode(true);

        const name = this._data.name;
        const image = this._data.link;
        const cardImage = this._element.querySelector(".card__image");
        const cardTitle = this._element.querySelector(".card__title");
        cardImage.setAttribute("src", image);
        cardImage.setAttribute("alt", this.name);
        cardTitle.textContent = this.name;

        this._setEventListeners();
        return this._element;
    }
}