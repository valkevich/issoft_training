import { storage } from "../storage/storage.js";


export class Users {
    constructor() {
        this.users = JSON.parse(storage.getItem('users'));
    }

    getUsers() {
        return Object.keys(this.users);
    }

    getUsersData() {
        return Object.values(this.users);
    }

    getUser(userEmail) {
        let SelectedUser;
        const usersArray = this.getUsersData();
        usersArray.find((user) => {
            if (user.email === userEmail) {
                SelectedUser = user;
            }
        })
        return SelectedUser;
    }

    showCurrentUser() {
        const currentUser = JSON.parse(storage.getItem('currentUser'));
        const navigationContainer = document.querySelector('.navigation__user-email');
        navigationContainer.textContent = `${currentUser}`;
    }

    renderUsers(usersContainer) {
        this.showCurrentUser();
        const usersData = this.getUsersData();
        usersData.forEach(user => {
            usersContainer.insertAdjacentHTML('beforeend', `
            <div class="users__data-line" id="${user.email}">
                <div class="user__data-column">${user.email}</div>
                <div class="user__data-column">${user.password}</div>
                <div class="user__data-column">${user.birthDate}</div>
                <div class="user__data-column">${user.sex}</div>
                <div class="user__data-column">
                    <button id="user__data--edit-button">Edit</button>
                    <button id="user__data--delete-button">Delete</button>
                </div>
            </div>  
            `);
        })
    }
}