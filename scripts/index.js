import Modal from "./Modal.js";
import { SignUpForm } from "./SignUpForm.js";
import { SignInForm } from "./SignInForm.js";


// Modal variables
export const modalWindow = new Modal();
const loginButton = document.querySelector('#modal-window__sign-in');
const registrationButton = document.querySelector('#modal-window__sign-up');



//Form variables
const formForRegistration = new SignUpForm(document.querySelector('#sign-up__form'), document.querySelector('#email__input--sign-up'), document.querySelector('#password__input--sign-up'), document.querySelector('#password-repeat__input--sign-up'),document.querySelector('#date-input'));
const formForLogin = new SignInForm(document.querySelector('#sign-in__form'), document.querySelector('#email__input--sign-in'), document.querySelector('#password__input--sign-in'));



// Modal event listeners
loginButton.addEventListener('click', () => {
    modalWindow.openModal(document.querySelector('#sign-in__form'));
});

registrationButton.addEventListener('click', () => {
    modalWindow.openModal(document.querySelector('#sign-up__form'));
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window__close')) {
        const modalForm = e.target.nextElementSibling;
        modalWindow.closeModal(modalForm);
    }
});

//Form event listeners
document.querySelector('#sign-up__form').addEventListener('click', () => {
    formForRegistration.validate();
});

document.querySelector('#sign-in__form').addEventListener('click', () => {
    formForLogin.validate();
});

document.querySelector('#sign-up__form').addEventListener('submit', (e) => {
    formForRegistration.onSubmit(e);
});

document.querySelector('#sign-in__form').addEventListener('submit', (e) => {
    formForLogin.onSubmit(e);
});


