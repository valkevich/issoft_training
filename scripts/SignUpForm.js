import { Form } from "./Form.js";
import { storage } from "./storage.js";

export class SignUpForm extends Form {
    constructor(form, userEmail, userPassword, userConfirmPassword) {
        super();
        this.form = form;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userConfirmPassword = userConfirmPassword;
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

    registerUser() {
        if (this.confirmPassword()) {
            if (storage.getItem('users') != null) {
                const users = JSON.parse(storage.getItem('users'));
                users[this.userEmail.value] = { password: this.userPassword.value };
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
        this.registerUser() ? document.querySelector('.modal-window__sign-up').classList.add('not-active') : false;

    }
}