export class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
    }

    renderItems() {
        this._items.forEach((item) => this._renderer(item));
    }

    addItem(element) {
        document.querySelector(this._selector).append(element);
        items.append(element);
    }
}