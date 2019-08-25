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
    constructor() {
        users = [];
    }

    static grabAllUsers() {
        return JSON.parse(localStorage.getItem('users'));
    }
}

// Sales Item registry: Holds and handles all the sales Items
class SalesItemsRegistry {
    static getAllSalesItems() {
        const salesItems = JSON.parse(localStorage.getItem('salesItems'));
        return salesItems;
    }

    // Gets a spesific sales item from the registry based on ID. The ID is the index in the registry
    static getItemByID(id) {
        const salesItems = SalesItemsRegistry.getAllSalesItems();
        const salesItem = salesItems[id];
        return salesItem;
    }

    // Updates the local storage
    static updateRegistry(salesItems) {
        const allSalesItems = [];
        if (SalesItemsRegistry.getAllSalesItems() !== null) {

            SalesItemsRegistry.getAllSalesItems().forEach((salesItem) => {
                allSalesItems.push(salesItem);
            });
        }
        allSalesItems.push(salesItems);
        localStorage.setItem('salesItems', JSON.stringify(allSalesItems));
    }

    // Submit to registry
    static submitToLocalStorage(salesItem) {
        SalesItemsRegistry.updateRegistry(salesItem);
    }
}

// UI class: Handeling UI
class UI {

    static start() {
        UI.showStore();
        if (Auth.isLoggedIn()) {
            UI.showUsernameAtTop()
        } else {
            UI.showLoginButton();
        }

        // Event: Listen for home click.
        UI.addEventListnerToLogo();
    }

    static addEventListnerToLogo() {
        const logo = document.querySelector('h1#logo');
        logo.addEventListener('click', () => {
            UI.showStore();
        })
    };

    // Grabbing the container element
    // constructor() {
    // }
    static showLoginButton() {
        if (!Auth.isLoggedIn()) {
            const div = document.querySelector('div#buttonOrUser');
            const markup = `<a href="#">Login</a>`;
            div.innerHTML = markup;
            div.addEventListener('click', () => {
                UI.showLoginForm();
            })

        }
    }

    static showUsernameAtTop() {
        if (Auth.isLoggedIn()) {
            const buttonOrUser = document.querySelector("#buttonOrUser");
            const user = Store.getCurrentUser()
            buttonOrUser.innerHTML = `${user.username}`;
        }
    }

    static showLoginForm() {
        // Creating the login form
        const container = document.querySelector(".container");
        container.innerHTML = `
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
        const container = document.querySelector(".container");
        container.innerHTML = `
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
        const container = document.querySelector(".container");
        container.innerHTML = '';
        if (salesItems === null) {
            container.innerHTML = 'Nothing in register';
        } else {
            salesItems.forEach((salesItem) => {
                // Creating the markup for the post
                const div = document.createElement('div');
                div.classList.add('salesItem');
                const markup = `
                <h2> ${salesItem.title} </h2>
                <h3> ${salesItem.price} </h3>
                <p> ${salesItem.description} </p>
                <img class="previewPicture" src=${salesItem.pictures[0]} >
                `;
                div.innerHTML = markup;

                container.appendChild(div);
            })

            // Adding event listener for the div.
            UI.addEventListenerToSalesItems();
        }
    }

    static addEventListenerToSalesItems() {
        const salesItems = document.querySelectorAll('div.salesItem')
        for (let i = 0; i < salesItems.length; i++) {

            salesItems[i].addEventListener('click', () => {

                UI.showSalesItemDetails(i);
            })
        }
    }

    static showAddNewSalesItemButton() {
        // Making and creating the button
        const addNewSalesItemButton = document.createElement('button');
        addNewSalesItemButton.classList.add('addNewSalesItem', 'button');
        addNewSalesItemButton.innerText = '+';

        // Adding the button to the DOM
        const container = document.querySelector(".container");
        container.appendChild(addNewSalesItemButton);

        // Adding click eventlistner
        addNewSalesItemButton.addEventListener('click', UI.showAddNewItemForm);
    }

    static showSalesItemDetails(salesItemID) {
        const container = document.querySelector(".container");
        const salesItem = SalesItemsRegistry.getItemByID(salesItemID);
        const div = document.createElement('div');
        div.classList.add('salesItemDetails');

        const markup = `
            <h2> ${salesItem.title} </h2>
            <h3> ${salesItem.price} </h3>
            <p> ${salesItem.description} </p>
            <img src=${salesItem.pictures[0]} >
        `;

        div.innerHTML = markup;
        container.innerHTML = '';
        container.appendChild(div);
    }

    static showStore() {
        UI.showAllSaleItems();
        if (Auth.isLoggedIn()) {
            UI.showAddNewSalesItemButton();
        }
    }

    static showAddNewItemForm() {
        if (Auth.isLoggedIn) {
            const container = document.querySelector(".container");
            container.innerHTML = `
            <form class="salesItemForm">
            <label for="title">Title</label>
            <input type="text" id="title" required>
            <label for="price">Price</label>
            <input type="num" id="price" required>
            <label for="description">Description</label>
            <textarea id="description"></textarea>
            <label for="picture" class="button">Add images</label>
            <input type="file" id="picture" accept="image/*" multiple>
            <div class="buttonHolder">
            <input class="button submit" type="submit" value="Submit sales item">
            <input class="button cancel" type="reset" value="Cancel">
            </div>
            </form>
            `;

            //Event: Trigger when picture input field is changed
            const pictureInput = document.querySelector('input#picture');
            pictureInput.addEventListener('change', function (e) {
                SalesPostHandler.showPreviewPicture(e);
            });

            //Event: Cancel button should reset form and send user to home screen
            // TODO finish this
            const cancelButton = document.querySelector('input[type="reset"');
            cancelButton.addEventListener('click', () => {
                UI.showStore();
            });

            // Event: Submit
            const salesItemForm = document.querySelector('form.salesItemForm');
            salesItemForm.addEventListener('submit', (e) => {
                e.preventDefault();
                SalesPostHandler.validateSalesItemForm(salesItemForm);
                UI.showStore();
            })
        }
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
            Store.addLoggedInUser(user);
            UI.showUsernameAtTop(user);
            UI.showStore();
        };
    }

    // Check if the user exist in user registry. Returns true if user exist, and false if not.
    static checkUsernameAndPassword(user) {
        let match = false;
        const users = UsersRegistry.grabAllUsers();

        users.forEach(element => {

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
class SalesItem {
    constructor(title, price, description, pictures) {
        this.title = title;
        this.price = price; // A integer in NOK
        this.description = description;
        this.pictures = pictures;
    }
    // todo Evaluate data
}


// Store class: To handle local storage
class Store {
    // Gets the current logged in user
    static getCurrentUser() {
        let user;
        if (localStorage.getItem('loggedInUser') === null) {
            user = null;
        } else {
            user = JSON.parse(localStorage.getItem('loggedInUser'));
        }
        return user;
    }

    // Gets all the users that are registered
    static getAllUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    // Adds a new user to the registry
    static addNewUserToRegistry(user) {
        let users = Store.getAllUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Adds the logged in user to the local storage to keep user logged in after refresh or window close
    static addLoggedInUser(user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    // Removes the logged in user from local storage
    static removeLoggedInUser() {
        localStorage.removeItem('user');
    }
}

// Handels all tasks related to making a new sales post
class SalesPostHandler {

    // Deletes the previous used picture preview element if any
    static deletePreveousPreview() {
        const imagesHolder = document.querySelector('.imagesHolder');
        if (imagesHolder) {
            imagesHolder.parentElement.removeChild(imagesHolder);
        }
    }

    // Show the preview pictures in the ui
    // todo should this be moved to UI class?
    static showPreviewPicture(event) {
        SalesPostHandler.deletePreveousPreview();
        const files = event.target.files;
        const placeUnderThisElement = document.querySelector('textarea#description');
        const imagesHolder = document.createElement('div');
        imagesHolder.classList.add('imagesHolder');

        // placeing the image holder in the DOM
        placeUnderThisElement.parentElement.insertBefore(imagesHolder, placeUnderThisElement.nextSibling);

        // Creatng the deleteImagesButton
        const deleteImagesButton = SalesPostHandler.createDeleteButton();

        // Adding delete images button after the add images button
        const addImageButton = document.querySelector('input#picture');
        if (!document.querySelector('button#deleteImages')) {
            addImageButton.parentElement.insertBefore(deleteImagesButton, addImageButton);
        }

        // Loop through all the files 
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.classList.add('previewPicture');
                //Setting unique id for picture
                img.id = i;
                //Setting  the src of the image
                img.src = reader.result;
                //placing the image in the imageholder
                imagesHolder.appendChild(img);
                SalesPostHandler.addClickEventToImage(img);
            }
            reader.readAsDataURL(files[i]);
        }
    }

    // Delete button
    static createDeleteButton() {
        const deleteImagesButton = document.createElement('button');
        deleteImagesButton.innerHTML = 'Delete images';
        deleteImagesButton.classList.add('button-small', 'button');
        deleteImagesButton.id = 'deleteImages';
        deleteImagesButton.setAttribute('disabled', '');
        deleteImagesButton.addEventListener('click', () => {
            SalesPostHandler.deleteImages();
            SalesPostHandler.imagesHolderNeeded();
            SalesPostHandler.toggleDeleteImageButton();
        });
        return deleteImagesButton;
    }

    // Checks if there is a need for a imageHolder. REmoves it of there are no images
    static imagesHolderNeeded() {
        if (document.querySelectorAll('img.previewPicture').length == 0) {
            document.querySelector('div.imagesHolder').remove();
        }
    }


    // Click event for preview pictures
    static addClickEventToImage(img) {
        img.addEventListener('click', () => {
            img.classList.toggle('selected');
            SalesPostHandler.toggleDeleteImageButton();
        })
    }

    // Toggle the disabled attribute on the delete images button. Enabled if images is selected, disabled if no images selected
    static toggleDeleteImageButton() {
        const selected = document.querySelectorAll('img.selected');
        const deleteButton = document.querySelector('button#deleteImages');

        if (selected.length > 0 && deleteButton.hasAttribute('disabled')) {
            deleteButton.toggleAttribute('disabled')
        }

        if (selected.length == 0 && !deleteButton.hasAttribute('disabled')) {
            deleteButton.toggleAttribute('disabled');
        }
    }

    // Delete all the selected images from the DOM
    static deleteImages() {
        const images = document.querySelectorAll('img.selected');
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            image.remove();
        }
    }

    // Validate form
    static validateSalesItemForm(form) {
        const title = form.querySelector('#title').value;
        const price = form.querySelector('#price').value;
        const description = form.querySelector('#description').value;
        const imagesHolder = form.querySelector('div.imagesHolder');
        const pictures = [];

        for (let i = 0; i < imagesHolder.childNodes.length; i++) {
            const pictureData = imagesHolder.childNodes[i].src;
            pictures.push(pictureData);
        }



        const salesItem = new SalesItem(title, price, description, pictures);
        SalesItemsRegistry.submitToLocalStorage(salesItem);
    }
}


// Main program
UI.start();
// if (!Auth.isLoggedIn()) {
//     UI.showLoginForm();
// } else {
//     UI.showUsernameAtTop();
//     UI.showStore();
//     // UI.showAddNewItemForm();
// }

// todo add submit event listeneres to buttons
// todo cancel button should trigger this.reset();
// todo how to make html elements easier in JS
// todo encrypting password
// todo implement routing and changing of screens whene something is done