// User: Represent a user of the system
class User {
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

// UsersRegistry: A class to hold all the reigstered users
class UsersRegistry {
    users = [];

    static grabAllUsers() {
        return JSON.parse(localStorage.getItem('users'));
    }
}

// Sales Item registry: Holds and handles all the sales Items
class SalesItemsRegistry {
    static getAllSalesItems() {
        return JSON.parse(localStorage.getItem('salesItems'));
    }

    static updateRegistry(salesItems) {
        localStorage.setItem('salesItem', JSON.stringify(salesItems));
    }
}

// UI class: Handeling UI
class UI {
    // Grabbing the container element
    static container = document.querySelector(".container");
    static buttonOrUser = document.querySelector("#buttonOrUser");

    static showUsernameAtTop(user) {
        this.buttonOrUser.innerHTML = `${user.username}`;
    }

    static showLoginForm() {
        // Creating the login form
        UI.container.innerHTML = `
        <h1>Login</h1>
        <div class="logininfo">
            <form>
                <label for="userID">User id:
                </label>
                <input type="text" id="userID" placeholder="username">
                <label for="userpassword">Password:
                </label>
                <input type="password" id="userpassword" placeholder="password">
                <button type="submit" class="button submit" id="loginButton">Login</button>
            </form>
        </div>
        <a href="#" id="createNewUser">Creat new user</a> <!-- todo link to creat user page-->
        `;

        // Events: Create new user
        const createNewUserLink = document.querySelector('#createNewUser');
        createNewUserLink.addEventListener('click', UI.showCreateNewUser);

        // Event: Login
        const loginButton = document.querySelector('#loginButton');
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

    static showAllSaleItems() {
        const salesItems = SalesItemsRegistry.getAllSalesItems();
        if (salesItems === null) {
            UI.container.innerHTML = '';
            return
        }
        salesItems.forEach((salesItem) => {
            UI.container.innerHTML = `<div>
                <h2> ${salesItem.title} </h2>
                <h3> ${salesItem.price} </h3>
                <p> ${salesItem.description} </p>
            </div>`;
        })
    }

    static showAddNewSalesItemButton() {
        const addNewSalesItemButton = document.createElement('button');
        addNewSalesItemButton.classList.add('addNewSalesItem', 'button');
        addNewSalesItemButton.innerText = '+';
        console.log(addNewSalesItemButton);

        UI.container.appendChild(addNewSalesItemButton);

        // Adding click eventlistner
        addNewSalesItemButton.addEventListener('click', UI.showAddNewItemForm);
    }

    static showStore() {
        UI.showAllSaleItems();
        UI.showAddNewSalesItemButton();
    }

    static showAddNewItemForm() {
        UI.container.innerHTML = `
        
        `;
    }
}

// Auth class: Handeling authentication of users
class Auth {

    // Logging in user
    static logIn() {
        const userID = document.querySelector('#userID').value;
        const userPassword = document.querySelector('#userpassword').value;

        const user = {
            username: userID,
            password: userPassword
        };


        if (Auth.checkUsernameAndPassword(user)) {
            console.log(Auth.checkUsernameAndPassword(user));

            Store.addLoggedInUser(user);
            UI.showUsernameAtTop(user);
            UI.showStore();
        };
    }

    // Check if the user exist in user registry. Returns true if user exist, and false if not.
    static checkUsernameAndPassword(user) {
        let match = false;
        const users = UsersRegistry.grabAllUsers();
        console.log(users);

        users.forEach(element => {
            console.log(element.username);

            if (element.username === user.username && element.password === user.password) {
                match = true;
            }
        });
        return match;
    }

    // Creats a new user and adds it to the store
    static createNewUser() {
        const user = Auth.grabUserDetails();
        Auth.addNewUserToStore(user);
    }

    // Grabbing the user details form the form and returning a user object
    static grabUserDetails() {
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;
        const streetaddress = document.querySelector('#streetaddress').value;
        const postalcode = document.querySelector('#postalcode').value;
        const city = document.querySelector('#city').value;
        const email = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        const user = new User(firstname, lastname, streetaddress, postalcode, city, email, username, password);
        console.log(user);
        return user;

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
        Store.addNewUserToRegistry(user);
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
        if (localStorage.getItem('loggedInUser') === null) {
            user = null;
        } else {
            user = JSON.parse(localStorage.getItem('loggedInUser'));
        }
        return user;
    }

    static getAllUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static addNewUserToRegistry(user) {
        let users = Store.getAllUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static addLoggedInUser(user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    static removeLoggedInUser() {
        localStorage.removeItem('user');
    }
}


// Main program
if (!Auth.isLoggedIn()) {
    UI.showLoginForm();
} else {
    UI.showUsernameAtTop(Store.getCurrentUser());
    UI.showStore();
}