import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    _handleEscClose(event) {
        super._handleEscClose(event);
    }

    open(data) {
        const imageLink = data.link;
        const imageTitle = data.name;
        const openedImage = this._element.querySelector(".modal__image");
        const imageSubtitle = this._element.querySelector(".modal__image-subtitle");
        openedImage.setAttribute("src", imageLink);
        openedImage.setAttribute("alt", imageTitle);
        imageSubtitle.textContent = imageTitle;
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}