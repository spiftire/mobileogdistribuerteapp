// User: Represent a user of the system
class user {
    constructor(firstname, lastname, streetAddress, city, postalCode, email, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.streetAddress = streetAddress;
        this.city = city;
        this.postalCode = postalCode;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

// UI class: Handeling UI
class UI {
    // Grabbing the container element
    static container = document.querySelector(".container");

    static showLogin() {
        // Creating the login form
        UI.container.innerHTML = `
        <h1>Login</h1>
        <div class="logininfo">
            <form>
                <label for="userID">User id:
                </label>
                <input type="text" id="userID" placeholder="user name">
                <label for="userpassword">Password:
                </label>
                <input type="password" id="userpassword" placeholder="password">
                <button type="submit" class="button login submit">Login</button>
            </form>
        </div>
        <a href="#" id="createNewUser">Creat new user</a> <!-- todo link to creat user page-->
        `;

        // Events: Create new user
        const createNewUserLink = document.querySelector('#createNewUser');
        createNewUserLink.addEventListener('click', UI.showCreateNewUser);

        // Event: Login
        const loginButton = document.querySelector('.login');
        loginButton.addEventListener('click', Auth.logIn);
    };

    static showCreateNewUser() {
        UI.container.innerHTML = `
        <h1>Create User</h1>
        <form>
        <label for="firstname">Firstname
        </label>
            <input type="text"  id="firstname" placeholder="Firstname">
            <label for="lastname">Lastname
            </label>
            <input type="text"  id="lastname" placeholder="Lastname">
            <label for="streetaddress">Street address
            </label>
            <input type="text"  id="streetaddress" placeholder="Street and number">
            <label for="city">City
            </label>
            <input type="text"  id="city" placeholder="City">
            <label for="postalcode">Postal code
            </label>
            <input type="text"  id="postalcode" placeholder="Postal code">
            <label for="email">Email address
            </label>
            <input type="email"  id="email" placeholder="Email address">
            <label for="username">Username
            </label>
            <input type="text"  id="username" placeholder="Username">
            <label for="password">Password
            </label>
            <input type="password" id="password" placeholder="Password">
            <button type="submit" class="button submit" id="creatNewUserButton">Create User</button>
        </form>
        `;

        // Event: Creat new user
        const creatNewUserButton = document.querySelector('#creatNewUserButton');
        creatNewUserButton.addEventListener('click', Auth.createNewUser);
    }
}

// Auth class: Handeling authentication of users
class Auth {

    // Logging in user
    static logIn() {
        const userID = document.querySelector('#userID').value;
        const userPassword = document.querySelector('#userpassword').value;
        const user = {
            userID: userID,
            password: userPassword
        };

        Store.addLoggedInUser(user);
    }

    // Creats a new user and adds it to the store
    static createNewUser() {
        const user = Auth.grabUserDetails();
        UI.addNewUserToStore(user);
    }

    static grabUserDetails() {

    }

    // Check if there is a user logged in or not
    static isLoggedIn() {
        const user = Store.getCurrentUser();
        let returnValue = false;

        if (user !== null) {
            returnValue = true;
        }

        return returnValue;
    }

    // Adds new user to the store
    static addNewUserToStore(user) {
        Store.addLoggedInUser(user);
    }
}

// Sale item class: Representing a sale item
class SaleItem {
    constructor(title, price, description) {
        this.title = title;
        this.price = price; // A integer in NOK
        this.description = description;
    }
}


// Store class: To handle local storage
class Store {
    static getCurrentUser() {
        let user;
        if (localStorage.getItem('user') === null) {
            user = null;
        } else {
            user = JSON.parse(localStorage.getItem('user'));
        }
        return user;
    }

    static addLoggedInUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static removeLoggedInUser() {
        localStorage.removeItem('user');
    }
}


// Main program
if (!Auth.isLoggedIn()) {
    UI.showLogin();
}