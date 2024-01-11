export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._element = document.querySelector(selector);
    }

    _handleEsc = (event) => {
        if (event.key === "Escape") {
            // this.close() is not working, and the program sees "this" as the document
            // cound you please explain, is there some other way to implement this method?
            const openedPopup = document.querySelector(".modal_opened");
            openedPopup.classList.remove("modal_opened");
            document.removeEventListener("keydown", _handleEsc);
        }
    }

    open() {
        this._element.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEsc);
    }

    close() {
        this._element.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEsc);
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