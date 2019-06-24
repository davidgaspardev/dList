import Realm, { Configuration, Results } from 'realm';

export default class RealmIO {

    /**
     * Atributes
     */
    private _realm: Realm; // Database's machine
    private _config: Configuration; // Database's configuration
    private _schema: string; // Database's schema (name)

    /**
     * Methods Getters and Setters
     */

    /**
     * @returns {Realm} 
     */
    private get realm(): Realm {
        return this._realm;
    }
    /**
     * @param {Realm} realm
     */
    private set realm(realm: Realm) {
        this._realm = realm;
    }

    /**
     * @returns {Configuration}
     */
    private get config(): Configuration {
        return this._config;
    }
    /**
     * @param {Configuration} config
     */
    private set config(config: Configuration) {
        this._config = config;
    }
    
    /**
     * @returns {string}
     */
    private get schema(): string {
        return this._schema;
    }
    /**
     * @param {string} currentSchema
     */
    private set schema(currentSchema: string) {
        this._schema = currentSchema;
    }

    /**
     * Realm I/O (input and output)
     * 
     * @constructor
     * @param {string|undefined} currentSchema 
     */
    constructor(currentSchema?: string) {

        if(typeof currentSchema !== 'undefined') {
            this.schema = currentSchema;
        }else {
            this.schema = 'Item';
        }

        this.config = require('./config.json');

        // Instance of Realm (database)
        this.realm = new Realm(this.config);

    }

    /**
     * Data input
     * 
     * @param {T} data 
     * @param {string} currentSchema
     * @param {boolean} update
     * @returns {Promise<any>}
     */
    protected async write<T>(data: T, currentSchema: string = this.schema, update: boolean = false): Promise<any> {
        // Destructuring assignment
        const { realm } = this;

        // Write data on database (Realm)
        await realm.write(() => {
            realm.create<T>(currentSchema, data, update);
        });
    }

    /**
     * Data input (delete)
     * 
     * @param {string} currentSchema 
     * @param {string|undefined} filter
     * @returns {Promise<any>}
     */
    protected async writeDelete<T>(currentSchema: string = this.schema, filter?: string): Promise<any> {
        // Destructuring assignment
        const { realm } = this;

        await realm.write(() => {

            let data = this.read<T>(currentSchema, filter);

            realm.delete(data);

        });
    }

    /**
     * Data output
     * 
     * @param {string} currentSchema
     * @param {string|undefined} filter 
     * @returns {Results<any>}
     */
    protected read<T>(currentSchema: string = this.schema, filter?: string): Results<T> {
        // Destructuring assignment
        const { realm } = this;

        // Check for filter      
        if(typeof filter !== 'undefined') {
            return realm.objects<T>(currentSchema).filtered(filter);
        }

        // Return all data
        return this.realm.objects<T>(currentSchema);
    }

    /**
     * Is there the data on database
     * 
     * @param {string} property 
     * @param {string} value 
     * @param {string} currentSchema
     * @returns {boolean}
     */
    protected isThere<T>(propertyName: string, propertyValue: string, currentSchema: string = this.schema): boolean {
        // Destructuring assignment
        const { realm } = this;

        let isThereData: Results<T> = realm.objects<T>(currentSchema).filtered(`${propertyName} == '${propertyValue}'`);

        if(isThereData.length > 0) {
            return true;
        }

        return false;

    }

}