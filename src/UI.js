import SalesPostHandler from "./SalesPostHandler.js";
import Auth from "./Auth.js";
import SalesItemsRegistry from './SalesItemsRegistry.js';
import UsersRegistry from './UsersRegistry.js';
// UI class: Handeling UI
export default class UI {
    static start() {
        UI.showStore();
        if (Auth.isLoggedIn()) {
            UI.showUsernameAtTop();
        } else {
            UI.showLoginButton();
        }
        // Event: Listen for home click.
        UI.addEventListnerToLogo();
    }
    // Event for the logo up top
    static addEventListnerToLogo() {
        const logo = document.querySelector('h1#logo');
        logo.addEventListener('click', () => {
            UI.showStore();
        });
    };
    // Show the login button if the user is not logged in
    static showLoginButton() {
        if (!Auth.isLoggedIn()) {
            const div = document.querySelector('div#buttonOrUser');
            const markup = `<a href="#">Login</a>`;
            div.innerHTML = markup;
            div.addEventListener('click', () => {
                UI.showLoginForm();
            });
        }
    }
    // Show username up top if user is logged in
    static showUsernameAtTop() {
        if (Auth.isLoggedIn()) {
            const buttonOrUser = document.querySelector("#buttonOrUser");
            const user = UsersRegistry.getCurrentUser();
            buttonOrUser.innerHTML = `${user.username}`;
        }
    }
    // Shows the login form
    static showLoginForm() {
        // Creating the login form
        const container = document.querySelector(".container");
        container.innerHTML = `
        <h1>Login</h1>
        <div class="logininfo">
            <form id="loginForm">
                <label for="userID">User id:
                </label>
                <input type="text" id="userID" placeholder="username" required>
                <label for="userpassword">Password:
                </label>
                <input type="password" id="userpassword" placeholder="password" required>
                <button type="submit" class="button submit" id="loginButton">Login</button>
            </form>
        </div>
        <a href="#" id="createNewUser">Creat new user</a> <!-- todo link to creat user page-->
        `;
        // Events: Create new user click event
        const createNewUserLink = document.querySelector('#createNewUser');
        createNewUserLink.addEventListener('click', UI.showCreateNewUserForm);
        // Event: Login button click event
        const loginForm = document.querySelector('#loginForm');
        loginForm.addEventListener('submit', Auth.logIn);
    };
    // Shows the create new user form
    static showCreateNewUserForm() {
        const container = document.querySelector(".container");
        container.innerHTML = `
        <h1>Create User</h1>
        <form id="createNewUserForm">
            <label for="firstname">Firstname
            </label>
            <input type="text"  id="firstname" placeholder="Firstname" required>
            <label for="lastname">Lastname
            </label>
            <input type="text"  id="lastname" placeholder="Lastname" required>
            <label for="streetaddress">Street address
            </label>
            <input type="text"  id="streetaddress" placeholder="Street and number" required>
            <label for="city">City
            </label>
            <input type="text"  id="city" placeholder="City" required>
            <label for="postalcode">Postal code
            </label>
            <input type="text"  id="postalcode" placeholder="Postal code" required>
            <label for="email">Email address
            </label>
            <input type="email"  id="email" placeholder="Email address" required>
            <label for="username">Username
            </label>
            <input type="text"  id="username" placeholder="Username" required>
            <label for="password">Password
            </label>
            <input type="password" id="password" placeholder="Password" required>
            <input type="submit" class="button submit" id="creatNewUserButton" value="Create User">
        </form>
        `;
        // Event: Creat new user if submit
        const createNewUserForm = document.querySelector('#createNewUserForm');
        createNewUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Auth.createNewUser();
            UI.showStore();
        });
    }
    // Shows all the sales items that are in the registry
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
            });
            // Adding event listener for the div.
            UI.addEventListenerToSalesItems();
        }
    }
    // Adds event click event listeners to all the sales items
    static addEventListenerToSalesItems() {
        const salesItems = document.querySelectorAll('div.salesItem');
        for (let i = 0; i < salesItems.length; i++) {
            salesItems[i].addEventListener('click', () => {
                UI.showSalesItemDetails(i);
            });
        }
    }
    // Adds new sales item button to the screen if the user is logged in
    static showAddNewSalesItemButton() {
        if (Auth.isLoggedIn()) {
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
    }
    // Shows the sales item details
    static showSalesItemDetails(salesItemID) {
        const container = document.querySelector(".container");
        const salesItem = SalesItemsRegistry.getItemByID(salesItemID);
        const div = document.createElement('div');
        div.classList.add('salesItemDetails');
        const markup = `
            <h2> ${salesItem.title} </h2>
            <h3> ${salesItem.price} </h3>
            <p> ${salesItem.description} </p>
            ${salesItem.pictures.length > 1 ? `<span id="arrowLeft" class="arrow"><i class="fas fa-chevron-left"></i></span>` : ''}
            <img src=${salesItem.pictures[0]} class="salesItemDetailPicture" id="0">
            ${salesItem.pictures.length > 1 ? `<span id="arrowRight" class="arrow"><i class="fas fa-chevron-right"></i></span>` : ''}
        `;
        div.innerHTML = markup;
        container.innerHTML = '';
        container.appendChild(div);
        this.picturesCaroussel(salesItem);
    }
    static picturesCaroussel(salesItem) {
        const pictures = salesItem.pictures;
        const imageElement = document.querySelector('img.salesItemDetailPicture');
        const leftArrow = document.querySelector('span#arrowLeft');
        const rightArrow = document.querySelector('span#arrowRight');

        function next() {
            let id = imageElement.id;
            if (id >= pictures.length - 1) {
                id = -1;
            }
            id++;
            imageElement.id = id;
            imageElement.src = pictures[id];
        }

        function prev() {
            let id = imageElement.id;
            if (id <= 0) {
                id = pictures.length;
            }
            id--;
            imageElement.id = id;
            imageElement.src = pictures[id];
        }
        // Adding events for arrows
        leftArrow.addEventListener('click', () => {
            prev();
        });
        rightArrow.addEventListener('click', () => {
            next();
        });
        // Adding events for keys
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                // right key pressed
                case 39:
                    next();
                    break;
                case 37:
                    prev();
                    break;
            }
        };
    }
    // Shows the store with all the sales items
    static showStore() {
        UI.showAllSaleItems();
        UI.showAddNewSalesItemButton();
    }
    // Shows the add new item form
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
            });
        }
    }
}