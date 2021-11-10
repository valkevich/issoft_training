import { setItem, getItem } from "./storage.js" 

export class Form {

    constructor(form){
        this.form = form
    }

    validate() {
        this.form.childNodes.forEach((children) => {
            if(children.nodeName === 'INPUT'){
                if(children.validity.patternMismatch){
                    children.nextElementSibling.textContent = `${children.getAttribute('data-error')}`
                }else {
                    children.nextElementSibling.textContent = ''
                }
            }
        })
    }

    onSubmit(e){
        e.preventDefault()
    }
}


export class SignUpForm extends Form {
    constructor(form, userEmail, userPassword, userConfirmPassword) {
        super()
        this.form = form
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userConfirmPassword = userConfirmPassword
    }

    confirmPassword(){
        this.validate()
        if(this.userPassword.value === this.userConfirmPassword.value){
            return true
        }else {
            this.userConfirmPassword.nextElementSibling.textContent = `${this.userConfirmPassword.getAttribute('data-error')}`
            return false
        }
    }

    registerUser() {
        if(this.confirmPassword()){
            if(getItem('users') != null){
                const users = JSON.parse(getItem('users'))
                users[this.userEmail.value] = {password: this.userPassword.value}
                setItem('users', JSON.stringify(users))
                return true
            }else {
                const users = {}
                setItem('users', JSON.stringify(users))
                this.registerUser()
            }
        }else{
            return false
        }
    } 

    onSubmit(e){
        super.onSubmit(e)
        this.registerUser()
        this.registerUser() ? document.querySelector('.modal-window__sign-up').classList.add('not-active') : false

    }
}

export class SignInForm extends Form {
    constructor(form, userEmail, userPassword) {
        super()
        this.form = form
        this.userEmail = userEmail
        this.userPassword = userPassword
    }

    checkUserEmail() {
        const users = JSON.parse(getItem('users'))
        if(this.userEmail.value in users){
            this.userEmail.nextElementSibling.textContent = ""
            return true
        }else {
            this.userEmail.nextElementSibling.textContent = `${this.userEmail.getAttribute('data-error')}`
            return false
        }
    }

    checkUserPassword() {
        if(this.checkUserEmail()){
            const users = JSON.parse(getItem('users'))
            if(users[this.userEmail.value].password !== this.userPassword.value){
                this.userPassword.nextElementSibling.textContent = `${this.userPassword.getAttribute('data-error')}`
            }else {
                this.userPassword.nextElementSibling.textContent = ''
                document.querySelector('.navigation__user-email').textContent = `${this.userEmail.value}`
                return true
            }
        }else {
            return false
        }
    }

    onSubmit(e){
        super.onSubmit(e)
        this.checkUserPassword()
        this.checkUserPassword() ? document.querySelector('.modal-window__sign-in').classList.add('not-active') : false
    }
}



