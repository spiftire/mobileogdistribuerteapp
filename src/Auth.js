/* eslint-disable import/extensions */
// Imports
import UsersRegistry from './UsersRegistry.js';
import User from './User.js';

/**
 * Auth class: Handeling authentication of users
 */
export default class Auth {
    /**
   * Logging in user
   */
    static logIn() {
        const userID = document.querySelector('#userID').value;
        const userPassword = document.querySelector('#userpassword').value;
        const user = {
            username: userID,
            password: userPassword
        };
        if (Auth.checkUsernameAndPassword(user)) {
            UsersRegistry.addLoggedInUser(user);
            // todo don't call UI from auth. Insted retrun a value
            UI.showUsernameAtTop(user);
            UI.showStore();
        }
    }

    /**
   *  Check if the user exist in user registry.
   * @param {User} user the user to check password of
   * @return {boolean} Returns true if user exist, and false if not.
   */
    static checkUsernameAndPassword(user) {
        let match = false;
        const users = UsersRegistry.getAllUsers();
        users.forEach((element) => {
            if (
                element.username === user.username &&
        element.password === user.password
            ) {
                match = true;
            }
        });
        return match;
    }

    /**
   * Creats a new user and adds it to the store
   */
    static createNewUser() {
        const user = Auth.grabUserDetails();
        Auth.addNewUserToStore(user);
    }

    /**
   * Grabbing the user details form the form and returning a user object
   * @return {User} The user details from the form
   */
    static grabUserDetails() {
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;
        const streetaddress = document.querySelector('#streetaddress').value;
        const postalcode = document.querySelector('#postalcode').value;
        const city = document.querySelector('#city').value;
        const email = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const user = new User(
            firstname,
            lastname,
            streetaddress,
            postalcode,
            city,
            email,
            username,
            password
        );
        return user;
    }

    /**
   * Check if there is a user logged in or not
   * @return {boolean} True if the user is logged in, false if not
   */
    static isLoggedIn() {
        let returnValue = false;
        const user = UsersRegistry.getCurrentUser();
        if (user !== null) {
            returnValue = true;
        }
        return returnValue;
    }

    /**
   * Adds new user to the store
   * @param {User} user the user to log in
   */
    static addNewUserToStore(user) {
        UsersRegistry.addNewUserToRegistry(user);
    }
}