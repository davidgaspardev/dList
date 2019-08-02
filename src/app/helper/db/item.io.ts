/**
 * Item 
 * Input and Ouput (Realm)
 * 
 * @author David Gaspar
 */
import Realm, { Results, Configuration } from 'realm';
import { Icrud, Iitem } from './types';
import { Strings } from '../../res/Strings';

export default class ItemIO implements Icrud {

    /**
     * Realm 
     * 
     * @description Database engine 
     * @private
     */ 
    private _realm: Realm;

    /**
     * Configuration
     * 
     * @description Structure and settings of the data that will be stored.
     * @private 
     */
    private _config: Configuration;

    /**
     * Current Schema
     * 
     * @description Data schema name (structure).
     * @private 
     */
    private _currentSchema: string;

    /**
     * Get/Set Realm
     * 
     * @description Method getter and setter to access Realm.
     * @private
     */
    private set realm(realm: Realm) {
        this._realm = realm;
    }
    private get realm(): Realm {
        return this._realm;
    }

    /**
     * Get/Set Configuration
     * 
     * @description Method getter and setter to access Configuration.
     * @private 
     */
    private set config(config: Configuration) {
        this._config = config;
    }
    private get config(): Configuration {
        return this._config;
    }


    /**
     * Get/Set Current Schema
     * 
     * @description Method getter and setter to access Current Schema.
     * @private
     */
    private set currentSchema(currentSchema: string) {
        // Check if schema exists
        for(let i in this.config.schema) {
            if(currentSchema === this.realm.schema[Number.parseInt(i)].name) {
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
        // Formatting the datas
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
        // Querying the database
        let isThereData: Results<T> = this.realm.objects<T>(currentSchema).filtered(`${propertyName} == '${propertyValue}'`);
        
        return isThereData.length > 0 ? true : false;
    }

    /**
     * Item Input Output
     * 
     * @constructor 
     * @param {?string} schemaName 
     */
    constructor(schemaName?: string) {
        // Get configuration to database
        this.config = require('./config.json');
        this.realm = new Realm(this.config);

        if(typeof schemaName !== 'undefined') {
            this.currentSchema = schemaName;
        }else {
            // Get default schema
            this.currentSchema = this.realm.schema[0].name;
        }
    }

    /**
     * Create Item
     * 
     * @override
     * @description Create item in database (Realm).
     * @param {Iitem} item 
     * @param {(err?: any) => void|undefined} callback 
     */
    public createItem(item: Iitem, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;

        if(!this.alreadyExists<Iitem>('name', item.name)) {
            // Trying handle with database
            try {
                // Writing in database (Realm)
                this.realm.write(() => {
                    this.realm.create<Iitem>(currentSchema, item);
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
     * Read All Items
     * 
     * @override
     * @description Read all items from database (Realm).
     * @returns {Array<Iitem>}
     */
    public readAllItems(): Iitem[] {
        // Destructuring assigment
        const { currentSchema } = this;
        // Querying the database
        let results: Realm.Results<Iitem> = this.realm.objects<Iitem>(currentSchema);

        return this.formatResult(results);
    }

    /**
     * Read Items Width Filter 
     * 
     * @override
     * @description Read items with filter from database (Realm).
     * @param {string} filter 
     * @returns {Array<Iitem>}
     */
    public readItemsWithFilter(filter: string): Iitem[] {
        // Destructuring assigment
        const { currentSchema } = this;
        // Querying the database
        let results = this.realm.objects<Iitem>(currentSchema).filtered(filter);

        return this.formatResult(results);
    }

    /**
     * Update Item
     * 
     * @override
     * @description Update item from database (Realm).
     * @param {Iitem} item 
     * @param {(err?: any) => void|undefined} callback 
     */
    public updateItem(item: Iitem, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;
        
        if(!this.alreadyExists<Iitem>('id', item.id)) {            
            // Trying handle with database
            try {
                // Writing in database (Realm)
                this.realm.write(() => {
                    this.realm.create<Iitem>(currentSchema, item, true);
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
     * Delete Item
     * 
     * @override
     * @description Delete item from database (Realm).
     * @param {string} id 
     * @param {(err?: any) => void | undefined} callback
     */
    public deleteItem(id: string, callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;

        try {
            this.realm.write(() => {
                try {
                    // Getting item
                    let item = this.realm.objectForPrimaryKey<Iitem>(currentSchema, id);
                    // Delete keyword already exists, so a direct call is made to the method
                    this.realm.delete(item);
                }catch(err) {
                    // Check for callback
                    if(typeof callback !== 'undefined') callback(err.message);
                }
            });
        }catch(err) {
            if(typeof callback !== 'undefined') callback(err.menssage);
        }
        
    }

    /**
     * Delete All Items
     * 
     * @override
     * @description Delete all items from database (Realm).
     * @param {(err?: any) => void} callback 
     */
    public deleteAllItems(callback?: (err?: any) => void): void {
        // Destructuring assigment
        const { currentSchema } = this;

        try {
            this.realm.write(() => {
                try {
                    // Getting all items
                    let allItems = this.realm.objects<Iitem>(currentSchema);
                    // A delete keyword already exists, so a direct call is made to the method
                    this.realm.delete(allItems);
                }catch(err) {
                    // Check for callback
                    if(typeof callback !== 'undefined') callback(err.message);
                }
            });
        }catch(err) {
            if(typeof callback !== 'undefined') callback(err.message);
        }
    }

    /**
     * Generete Id
     * 
     * @description Generate a random id
     * @returns {string}
     */
    public genereteId(): string {
        return Math.random().toString(36).substr(2, 10) + new Date().toISOString().slice(10);
    }

}