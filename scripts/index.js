import ModalWindow from "./Modal.js";
import { SignUpForm } from "./SignUpForm.js";
import { SignInForm } from "./SignInForm.js";


// Modal variables
const loginModalWindow = document.querySelector('.modal-window__sign-in');
const registrationModalWindow = document.querySelector('.modal-window__sign-up');
const loginButton = document.querySelector('#modal-window__sign-in');
const registrationButton = document.querySelector('#modal-window__sign-up');
const registrationCloseButton = document.querySelector('#registration__close');
const loginCloseButton = document.querySelector('#login__close');

const signInModal = new ModalWindow(loginModalWindow);
const signUpModal = new ModalWindow(registrationModalWindow);

//Form variables
const formForRegistration = new SignUpForm(document.querySelector('#sign-up__form'), document.querySelector('#email__input--sign-up'), document.querySelector('#password__input--sign-up'), document.querySelector('#password-repeat__input--sign-up'));
const formForLogin = new SignInForm(document.querySelector('#sign-in__form'), document.querySelector('#email__input--sign-in'), document.querySelector('#password__input--sign-in'));


// Modal event listeners
loginButton.addEventListener('click', () => {
    signInModal.openModalWindow();
})

registrationButton.addEventListener('click', () => {
    signUpModal.openModalWindow();
})

loginCloseButton.addEventListener('click', () => {
    signInModal.closeModalWindow();
})

registrationCloseButton.addEventListener('click', () => {
    signUpModal.closeModalWindow();
})


//Form event listeners
document.querySelector('#sign-up__form').addEventListener('click', () => {
    formForRegistration.validate();
})

document.querySelector('#sign-in__form').addEventListener('click', () => {
    formForLogin.validate();
})

document.querySelector('#sign-up__form').addEventListener('submit', (e) => {
    formForRegistration.onSubmit(e);
})

document.querySelector('#sign-in__form').addEventListener('submit', (e) => {
    formForLogin.onSubmit(e);
})
