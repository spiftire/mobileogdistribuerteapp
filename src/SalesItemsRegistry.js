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