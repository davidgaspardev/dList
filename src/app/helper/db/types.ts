/**
 * CRUD and Item interfaces
 * CRUD: Create, Read, Update and Delete methods
 * Item: properties
 * 
 * @author David Gaspar
 */
export interface Iitem {

    // Properties from database (Realm with Item schema)
    id: string;
    name: string;
    price: number | null;
    quantity: number;
    unit: string;
    category: string;
    date: Date;

}

export interface Icrud {

    // Create a data in database
    createItem(item: Iitem, callback?: (err?: any) => void): void;

    // Read all datas from database
    readAllItems(): Array<Iitem>;

    // Read datas with filter from database
    readItemsWithFilter(filter: string): Array<Iitem>;

    // Update a data from database
    updateItem(item: Iitem,  callback?: (err?: any) => void): void;

    // Delete a data from database
    deleteItem(id: string, callback?: (err?: any) => void): void;

    // Delete all data from database
    deleteAllItems(callback?: (err?: any) => void): void;

}