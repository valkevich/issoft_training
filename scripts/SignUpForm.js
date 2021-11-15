import { Form } from "./Form.js";
import { storage } from "./storage.js";
import { modalWindow } from "./index.js";

export class SignUpForm extends Form {
    constructor(form, userEmail, userPassword, userConfirmPassword, userBithDate) {
        super();
        this.form = form;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userConfirmPassword = userConfirmPassword;
        this.userBithDate = userBithDate;
    }

    confirmPassword() {
        this.validate();
        if (this.userPassword.value === this.userConfirmPassword.value) {
            return true;
        } else {
            this.userConfirmPassword.nextElementSibling.textContent = `${this.userConfirmPassword.getAttribute('data-error')}`;
            return false;
        }
    }

    checkUserSex() {
        return document.querySelector('input[name="sex"]:checked').value;
    }


    registerUser() {
        if (this.confirmPassword()) {
            if (storage.getItem('users') != null) {
                const users = JSON.parse(storage.getItem('users'));
                users[this.userEmail.value] = { 
                    password: this.userPassword.value,
                    birthDate: this.userBithDate.value,
                    sex: this.checkUserSex()
                };
                storage.setItem('users', JSON.stringify(users));
                return true;
            } else {
                const users = {};
                storage.setItem('users', JSON.stringify(users));
                this.registerUser();
            }
        } else {
            return false;
        }
    }

    onSubmit(e) {
        super.onSubmit(e);
        this.registerUser();
        if (this.registerUser()) {
            this.cleanForm();
            modalWindow.closeModal(document.querySelector('#sign-up__form'));
        }

    }
}