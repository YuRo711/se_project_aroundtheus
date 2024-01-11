export class Popup {
    constructor(selector) {
        this._selector = selector;
        this._element = document.querySelector(selector);
    }

    open() {
        this._element.classList.add("modal_opened");
        document.addEventListener("keydown", this._escHandler);
    }

    close() {
        this._element.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._escHandler);
    }

    setEventListeners(escHandler) {
        this._element.addEventListener("click", (event) => {
            if (event.target === this._element) {
                this.close();
            }
        })

        const closeButton = this._element.querySelector(".modal__close-button");
        closeButton.addEventListener("click", () => {
            this.close();
        })

        this._escHandler = escHandler;
    }
}