export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._element = document.querySelector(selector);
    }

    _handleEscClose(event)
    {
        if (event.key === "Escape") {
            // this.close() is not working, and the program sees "this" as the document
            // cound you please explain, is there some other way to implement this method?
            this.close();
        }
    }

    open() {
        this._element.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._element.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._element.addEventListener("click", (event) => {
            if (event.target === this._element) {
                this.close();
            }
        })
        const closeButton = this._element.querySelector(".modal__close-button");
        closeButton.addEventListener("click", () => {
            this.close();
        })
    }
}