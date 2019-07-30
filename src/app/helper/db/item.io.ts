/**
 * Item 
 * Input and Ouput (Realm)
 * 
 * @author David Gaspar
 */
import Realm, { Results } from 'realm';
import { Icrud, Iitem } from './types';
import { Strings } from '../../res/Strings';

export default class ItemIO implements Icrud {

    private _realm: Realm;

    private _currentSchema: string;

    private set realm(realm: Realm) {
        this._realm = realm;
    }

    private get realm(): Realm {
        return this._realm;
    }

    private set currentSchema(currentSchema: string) {

        for(let i in this.realm.schema) {
            if(currentSchema === i) {
                this._currentSchema = currentSchema;
                break;
            }
        }

    }

    private get currentSchema(): string {
        return this._currentSchema;
    }

    /**
     * Converting Results<Iitem> to Array<Iitem>
     * 
     * @param {Results<Iitem>} result 
     * @returns {Array<Iitem>}
     */
    private formatResult(result: Results<Iitem>): Iitem[] {
        let resultFormat: Iitem[] = [];

        for(let i = 0; i < result.length; i++) {
            resultFormat[i] = { ...result[i] };
        }

        return resultFormat;
    }

    /**
     * Already exists the data on database
     * 
     * @param {string} property 
     * @param {string} value 
     * @param {string} currentSchema
     * @returns {boolean}
     */
    private alreadyExists<T>(propertyName: string, propertyValue: string): boolean {
        // Destructuring assigment
        const { currentSchema } = this;
        const { objects } = this.realm;

        let isThereData: Results<T> = objects<T>(currentSchema).filtered(`${propertyName} == '${propertyValue}'`);

        if(isThereData.length > 0) {
            return true;
        }

        return false;

    }

    constructor(schemaName?: string) {
        // Get configuration to database
        let config: Realm.Configuration = require('./config.json');

        this.realm = new Realm(config);

        if(typeof schemaName !== 'undefined') {
            this.currentSchema = schemaName;
        }else {
            this.currentSchema = this.realm.schema[0].name;
        }
    }

    /**
     * Create item in database (Realm)
     * 
     * @param {Iitem} item 
     * @param {(err?: any) => void|undefined} callback 
     */
    public createItem(item: Iitem, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;
        const { write, create } = this.realm;
        
        if(this.alreadyExists<Iitem>('name', item.name)) {

            
            // Trying handle with database
            try {

                // Writing in database (Realm)
                write(() => {
                    create<Iitem>(currentSchema, item);
                });

            }catch(err) {

                // Check for callback
                if(typeof callback !== 'undefined') callback(err.message);

            }

        }else {

            // Check for callback 
            if(typeof callback !== 'undefined') callback(Strings.toastAlert);

        }

    }

    /**
     * Read all items from database (Realm)
     * 
     * @returns {Array<Iitem>}
     */
    public readAllItems(): Iitem[] {
        // Destructuring assigment
        const { currentSchema } = this;
        const { objects } = this.realm;

        let results = objects<Iitem>(currentSchema);

        return this.formatResult(results);

    }

    /**
     * Read items with filter from database (Realm)
     * 
     * @param {string} filter 
     * @returns {Array<Iitem>}
     */
    public readItemsWithFilter(filter: string): Iitem[] {
        // Destructuring assigment
        const { currentSchema } = this;
        const { objects } = this.realm;

        let results = objects<Iitem>(currentSchema).filtered(filter);

        return this.formatResult(results);
    }

    /**
     * Update item from database (Realm)
     * 
     * @param {Iitem} item 
     * @param {(err?: any) => void|undefined} callback 
     */
    public updateItem(item: Iitem, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;
        const { write, create } = this.realm;
        
        if(!this.alreadyExists<Iitem>('id', item.id)) {

            
            // Trying handle with database
            try {

                // Writing in database (Realm)
                write(() => {
                    create<Iitem>(currentSchema, item, true);
                });

            }catch(err) {

                // Check for callback
                if(typeof callback !== 'undefined') callback(err.message);

            }

        }else {

            // Check for callback 
            if(typeof callback !== 'undefined') callback(Strings.toastAlert);

        }
    }

    /**
     * 
     * @param {string} id 
     * @param {(err?: any) => void) | undefined} callback 
     */
    public deleteItem(id: string, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;
        const { objectForPrimaryKey, write } = this.realm;

        write(() => {

            try {

                let item = objectForPrimaryKey(currentSchema, id);

                // A delete keyword already exists, so a direct call is made to the method
                this.realm.delete(item);

            }catch(err) {

                // Check for callback
                if(typeof callback !== 'undefined') callback(err.message);

            }

        });
        
    }
    public deleteAllItems(callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;
        const { objects, write } = this.realm;

        write(() => {

            try {

                let allItems = objects(currentSchema);

                // A delete keyword already exists, so a direct call is made to the method
                this.realm.delete(allItems);

            }catch(err) {

                // Check for callback
                if(typeof callback !== 'undefined') callback(err.message);
                
            }

        });
    }

}