class Form {

    constructor(userEmail, userPassword, form){
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.form = form
    }

    validateEmail(){
        let isEmailValid = false
        const regEmail = new RegExp(/^[^\s@]+@[^\s@]+$/)

        if(regEmail.test(String(this.userEmail.value))){
            document.querySelector('#email__warning').textContent = ''
            isEmailValid = true
        }else {
            document.querySelector('#email__warning').textContent = 'Email incorrect'
            isEmailValid = false
        }
        return isEmailValid
    }

    validatePassword() {
        let isPasswordValid = false
        const regPassword = new RegExp(/.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/)

        if(regPassword.test(String(this.userPassword.value))){
            document.querySelector('#password__warning').textContent = ''
            isPasswordValid = this.userPassword.value
        }else {
            document.querySelector('#password__warning').textContent = 'Password incorrect'
            isPasswordValid = false
        }

        return isPasswordValid
    }
}


class SignUpForm extends Form {

    constructor(userEmail, userPassword, form, confirmedPassword){
        super()
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.form = form
        this.confirmedPassword = confirmedPassword   
    }

    confirmPassword(){
        if(this.confirmedPassword.value === this.userPassword.value) {
            document.querySelector('#password-repeat__warning').textContent = ''
            return true
        }else {
            document.querySelector('#password-repeat__warning').textContent = 'Passwords not equal'
            return false
        }
         
    }

    registerUser() {
        if(this.validateEmail() && this.validatePassword() && this.confirmPassword()){
            if(localStorage.getItem("users")!= null){
                const users = JSON.parse(localStorage.getItem('users'))
                users.push({
                    email: String(this.userEmail.value),
                    password: String(this.userPassword.value),
                })
                localStorage.setItem('users', JSON.stringify(users))
            }else{
                const users = []
                localStorage.setItem('users', JSON.stringify(users))
                this.registerUser()
            }
            return true
        }else {
            return false
        }
    }
}


class LoginForm extends Form {
    constructor(userEmail, userPassword, form){
        super()
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.form = form
    }

    checkUserEmail() {
        let registredUser = false
        const users = JSON.parse(localStorage.getItem('users'))
        users.forEach(user => {
            if(user.email === this.userEmail.value){
                registredUser = user
            }
        });
        return registredUser;
    }
    
    checkUserPassword() {
        let correctUser = this.checkUserEmail();
        if(correctUser) {
            document.querySelector('#email__search').textContent = ''
            if(correctUser.password === this.userPassword.value) {
                alert("вход выполнен")
                document.querySelector('.navigation__user-email').textContent = this.userEmail.value
                document.querySelector('#password__search').textContent = ''
                return true
            }else {
                document.querySelector('#password__search').textContent = 'Wrong password'
                return false
            }
        }else {
            document.querySelector('#email__search').textContent = 'User is not found'
            return false
        }
    }
}


const formForRegistration = new SignUpForm(document.querySelector('#email__input--sign-up'), document.querySelector('#password__input--sign-up'), document.querySelector('#sign-up__form'), document.querySelector('#password-repeat__input--sign-up'))
const formForLogin = new LoginForm(document.querySelector('#email__input--sign-in'), document.querySelector('#password__input--sign-in'), document.querySelector('#sign-in__form'))

document.querySelector('#sign-in__button').addEventListener('click', (e) => {
    e.preventDefault()
    formForLogin.checkUserPassword()
})


document.querySelector('#sign-up__button').addEventListener('click', (e) => {
    e.preventDefault()
    formForRegistration.registerUser()
})




