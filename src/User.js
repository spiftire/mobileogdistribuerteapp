/**
 * User: Represent a user of the system
 */
export default class User {
    /**
     * Constructor for user
     * @param {String} firstname First name
     * @param {String} lastname Last name
     * @param {String} streetAddress Street address
     * @param {String} city City
     * @param {int} postalCode Postal code
     * @param {email} email valid email
     * @param {String} username Username also referensed as userID
     * @param {password} password valid password
     */
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