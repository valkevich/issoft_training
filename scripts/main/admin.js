import { EditUserForm } from "../forms/EditUserForm.js";
import { Users } from "../users/Users.js";
import { Modal } from "../modal/Modal.js";

const users = new Users();
const editModal = new Modal()
let MutableUser;


window.onload = () => {
    users.renderUsers(document.querySelector('.users__data'));
};

document.addEventListener('click', (e) => {
    if (e.target.id === 'user__data--edit-button') {
        const userEmail = e.target.parentElement.parentElement.id;
        MutableUser = new Users().getUser(userEmail);
        editModal.openModal(new EditUserForm().renderEditForm(MutableUser));
    }
})

document.addEventListener('click', (e) => {
    if (e.target.id === 'user__data--delete-button') {
        const userEmail = e.target.parentElement.parentElement.id;
        MutableUser = new Users().getUser(userEmail);
        new EditUserForm().deleteUser(MutableUser);
    }
})



document.addEventListener('submit', (e) => {
    e.preventDefault();
    new EditUserForm().onSubmit(MutableUser, document.querySelector('.modal-window__content--form'));
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window__close')) {
        const modalForm = document.querySelector('.modal-window__content--form');
        new Modal().closeModal(modalForm);
    }
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal-window__content--form')){
        new EditUserForm(document.querySelector('.modal-window__content--form')).validate()
    }
})
