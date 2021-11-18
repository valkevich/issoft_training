import { Form } from "../forms/Form.js";
import { storage } from "../storage/storage.js";
import { modalWindow } from "../main/index.js";

export class SignInForm extends Form {
    constructor(form, userEmail, userPassword) {
        super();
        this.form = form;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    checkUserEmail() {
        const users = JSON.parse(storage.getItem('users'));
        if (this.userEmail.value in users) {
            this.userEmail.nextElementSibling.textContent = "";
            return true;
        } else {
            this.userEmail.nextElementSibling.textContent = `${this.userEmail.getAttribute('data-error')}`;
            return false;
        }
    }

    setCurrentUser() {
        storage.setItem('currentUser', JSON.stringify(this.userEmail.value));
    }

    checkUserPassword() {
        if (this.checkUserEmail()) {
            const users = JSON.parse(storage.getItem('users'));
            if (users[this.userEmail.value].password !== this.userPassword.value) {
                this.userPassword.nextElementSibling.textContent = `${this.userPassword.getAttribute('data-error')}`;
            } else {
                this.setCurrentUser();
                window.location.href = 'users.html';
                return true;

            }
        } else {
            return false;
        }
    }


    onSubmit(e) {
        super.onSubmit(e);
        if (this.checkUserPassword()) {
            this.cleanForm();
            modalWindow.closeModal(document.querySelector('#sign-in__form'));
        } else false;
    }
}