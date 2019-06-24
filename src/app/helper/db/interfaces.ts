/**
 * CRUD interface
 * Create, Read, Update and Delete methods
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
    create(item: Iitem, callback?: (err?: any) => void, update?: boolean): void;

    // Read all datas from database
    readAll(): Array<Iitem>;

    // Read datas with filter from database
    readWithFilter(filter: string): Array<Iitem>;

    // Update a data from database
    update(item: Iitem,  callback?: (err?: any) => void): void;

    // Delete a data from database
    delete(id: string, callback?: (err?: any) => void): void;

    // Delete all data from database
    deleteAll(callback?: (err?: any) => void): void;

}