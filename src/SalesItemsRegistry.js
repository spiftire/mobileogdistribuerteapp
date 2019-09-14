/**
 * Sales Item registry: Holds and handles all the sales Items
 */
export default class SalesItemsRegistry {

    /**
     * Get all the sales items from local storage
     * @return {Array<SalesItem>} salesItems
     */
    static getAllSalesItems() {
        const salesItems = JSON.parse(localStorage.getItem('salesItems'));
        return salesItems;
    }

    /**
     * Gets a spesific sales item from the registry based on ID. The ID is the index in the registry
     * @param {int} id The id of the salesItem
     * @return {SalesItem} The sales item with id
     */
    static getItemByID(id) {
        const salesItems = SalesItemsRegistry.getAllSalesItems();
        const salesItem = salesItems[id];
        return salesItem;
    }

    /**
     * Updates the local storage
     * @param {SalesItem} salesItems Sales item to add to registry
     */
    static addToRegistry(salesItems) {
        const allSalesItems = [];
        if (SalesItemsRegistry.getAllSalesItems() !== null) {
            SalesItemsRegistry.getAllSalesItems().forEach((salesItem) => {
                allSalesItems.push(salesItem);
            });
        }
        allSalesItems.push(salesItems);
        localStorage.setItem('salesItems', JSON.stringify(allSalesItems));
    }

    /**
     * Submit to registry
     * @param {SalesItem} salesItem 
     */
    static submitToLocalStorage(salesItem) {
        SalesItemsRegistry.addToRegistry(salesItem);
    }
}