export class Section {
    constructor({items, renderer}, selector) {
        this._startItems = items;
        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(this._selector);
    }

    renderItems() {
        this._startItems.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        this._container.insertBefore(element, this._container.firstChild);
    }
}