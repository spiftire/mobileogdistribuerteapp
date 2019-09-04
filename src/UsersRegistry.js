// UsersRegistry: A class to hold all the reigstered users
export default
class UsersRegistry {
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
        let users = UsersRegistry.getAllUsers();
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