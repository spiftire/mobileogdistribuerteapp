/**
 * Sale item class: Representing a sale item
 */
export default class SalesItem {
    /**
     * 
     * @param {String} title Title of sales item
     * @param {int} price Price of the item
     * @param {String} description Description of item
     * @param {*} pictures Pictures to add to sales item
     */
    constructor(title, price, description, pictures) {
        this.title = title;
        this.price = price; // A integer in NOK
        this.description = description;
        this.pictures = pictures;
    }
}