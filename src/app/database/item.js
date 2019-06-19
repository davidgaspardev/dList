import { _create, _read } from './realm';

/**
 * Asynchonous Function
 * 
 * @param {Object} item 
 */
async function createItem(item) {
    await _create('Item', item);
}

/**
 * Function
 * 
 * @returns {Object}
 */
function getAllItems() {
    let items = _read('Item');
    items = formatItems(items);
    return items;
}

/**
 * Function
 * 
 * @param {string} search
 * @returns {Object}
 */
function searchItems(search) {
    // Search items
    let items = _read('Item', `name CONTAINS '${search}'`);
    // Format items
    items = formatItems(items);

    return items;
}

/**
 * Function
 * 
 * @param {Object} item 
 */
function formatItems(item) {
    let itemsFormated = [];

    for(let i = 0; i < item.length; i++) {
        itemsFormated[i] = {
            id: item[i].id,
            name: item[i].name,
            price: item[i].price,
            quantity: item[i].quantity,
            unit: item[i].unit,
            category: item[i].category
        }
    }

    return itemsFormated;

}

export { createItem, getAllItems, searchItems };