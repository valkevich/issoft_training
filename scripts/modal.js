export default class Modal {
    static instance = null;
    constructor() {
        if (Modal.instance) {
            return Modal.instance;
        }
        Modal.instance = this;
    }

    getTemplate() {
        return `
        <div class="modal-window">
            <div class="modal-window__content">
                <span class="modal-window__close"></span>
            </div>
        </div>
        `
    }

    openModal(form) {
        document.body.insertAdjacentHTML('afterend', this.getTemplate());
        const modalWindow = document.querySelector('.modal-window__content');
        form.classList.remove('not-active');
        modalWindow.append(form);

    }

    closeModal(form) {
        const modal = document.querySelector('.modal-window');
        form.classList.add('not-active');
        document.body.append(form);
        modal.remove();
    }
}
