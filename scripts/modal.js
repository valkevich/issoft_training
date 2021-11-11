export default class ModalWindow {

    constructor(modal) {
        this.modal = modal;
    }

    openModalWindow() {
        this.modal.classList.remove('not-active');
    }

    closeModalWindow() {
        this.modal.classList.add('not-active');
    }
}
