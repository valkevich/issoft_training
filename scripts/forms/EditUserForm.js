import { Form } from "./Form.js";
import { storage } from "../storage/storage.js";
import { Modal } from "../modal/Modal.js";

const getEditFormTemplate = (user) => {
    return `
        <h2 class="form--title">Edit user</h2>

        <label for="password__input" class="input__label">Old password</label>
        <input type="password" id="edit__user--old-password" class="modal-window__content--input edit__form--password old-password" required="required"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="password__warning" class="warning__text"></span>

        <label for="password__input" class="input__label">New password</label>
        <input type="password"   id="edit__user--new-password" class="modal-window__content--input edit__form--password new-password" required="required"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="password__warning" class="warning__text"></span>

        <label for="password__input" class="input__label">Repeat new password</label>
        <input type="password"  name="password" id="password__input--edit-user" class="modal-window__content--input edit__form--password new-password" required="required"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="edit__password-repeat--warning" class="warning__text"></span>

        <label for="date-input" class="input__label">Date of Birth</label>
        <input type="date" value="${user.birthDate}" name="birthDate" id="date-input" class="modal-window__content--input"
            required="required" data-error="Date not selected">
        <span id="birth-data__warning" class="warning__text"></span>

        <div class="modal-window__radio-buttons">
            <p class="input__label">Sex</p>
            <input type="radio" id="male-radio" name="sex" value="male" class="modal-window__radio-button">
            <label  for="male-radio" class="radio__label">Male</label>

            <input type="radio" id="female-radio" name="sex" value="female" class="modal-window__radio-button" checked> 
            <label for="female-radio" class="radio__label">Female</label>     
        </div>

        <button class="modal-window__content--button" id="save__user-data--button">Save</button>
    `
}


export class EditUserForm extends Form {
    constructor(form) {
        super();
        this.form = form
    }

    renderEditForm(user) {
        const form = document.createElement('form');
        form.classList.add('modal-window__content--form');
        form.classList.add('not-active');
        form.id = user.email;
        form.innerHTML = getEditFormTemplate(user);
        return form
    }

    changeUserData(user, form) {
        Array.from(form).forEach((element) => {
            if (element.nodeName === 'INPUT') {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        user[element.name] = element.value;
                    }
                } else {
                    user[element.name] = element.value;
                }

            }
        })
        return user
    }

    checkPassword(form) {
        const passwords = {
            newPasswords: []
        }
        Array.from(form).forEach((elem) => {
            if (elem.classList.contains('edit__form--password')) {
                if (elem.classList.contains('new-password')) {
                    passwords.newPasswords.push(elem.value);
                } else {
                    passwords.oldPassword = elem.value;
                }
            }

        })
        return passwords;
    }

    validatePasswords(user, form) {
        const passwords = this.checkPassword(form);
        if (passwords.newPasswords[0] === passwords.newPasswords[1] && passwords.oldPassword === user.password) {
            return true;
        } else {
            document.querySelector('#edit__password-repeat--warning').textContent = 'Password data entered incorrectly'
        }
    }

    saveUserData(user, form) {
        if (this.validatePasswords(user, form)) {
            const previousUserData = { ...user };
            const actualUserData = this.changeUserData(user, document.querySelector('.modal-window__content--form'));
            const users = JSON.parse(storage.getItem('users'));
            users[previousUserData.email] = actualUserData;
            storage.setItem('users', JSON.stringify(users));
            return true;
        } else {
            return false
        }
    }

    deleteUser(user) {
        if (user.email === JSON.parse(storage.getItem('currentUser'))) {
            alert('it is impossible to delete this user');
        } else {
            const users = JSON.parse(storage.getItem('users'));
            delete users[user.email];
            storage.setItem('users', JSON.stringify(users));
            window.location.reload();
        }

    }

    onSubmit(user, form) {
        if (this.saveUserData(user, form)) {
            new Modal().closeModal(document.querySelector('.modal-window__content--form'));
            window.location.reload();
        }
    }
}
