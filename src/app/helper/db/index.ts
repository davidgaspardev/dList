import RealmIO from './realm.io';
import Item from './item';
import { Results } from 'realm';
import { Iitem, Icrud } from './interfaces';
import { Strings } from '../../res/Strings';

export default class DataBase extends RealmIO implements Icrud {

    /**
     * Atributes 
     */
    private _currentSchema: string;

    /**
     * Methods Getters and Setters
     */

    /**
     * @returns {string}
     */
    private get currentSchema(): string {
        return this._currentSchema;
    }
    /**
     * @param {string} currentSchema
     */
    private set currentSchema(currentSchema: string) {
        this._currentSchema = currentSchema;
    }

    /**
     * DataBase
     * 
     * @param {string} schema 
     */
    constructor(schema: string) {
        super(schema);

        this.currentSchema = schema;
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
            resultFormat[i] = new Item(result[i].id, result[i].name, result[i].price, result[i].quantity, result[i].unit, result[i].category, result[i].date);
        }

        return resultFormat;
    }

    /**
     * Create data
     * 
     * @override
     * @param {Iitem} item
     * @param {Function|undefined} callback
     */
    public create(item: Iitem, callback?: (err?: any) => void): void {
        // Destructuring assignment
        const { currentSchema } = this;

        // Check for item from database
        if(!this.isThere<Iitem>('name', item.name, currentSchema)){

            // Save item on database
            this.write<Iitem>(item, currentSchema).then(() => {

                // Success TODO:
                if(typeof callback !== 'undefined') callback();

            }).catch((error) => {

                // Failed TODO:
                if(typeof callback !== 'undefined') callback(error);

            });

        }else {
            if(typeof callback !== 'undefined') callback(Strings.toastAlert);
        }
    }
    
    /**
     * Read all data
     * 
     * @override
     * @returns {Array<Iitem>}
     */
    public readAll(): Iitem[] {
        // Destructuring assignment
        const { currentSchema } = this;

        return this.formatResult(this.read<Iitem>(currentSchema));
    }

    /**
     * Read data with filter
     * 
     * @override
     * @param {string} filter 
     */
    public readWithFilter(filter: string): Iitem[] {
        // Destructuring assignment
        const { currentSchema } = this;

        return this.formatResult(this.read<Iitem>(currentSchema, filter));
    }

    /**
     * Update data
     * 
     * @override
     * @param {Iitem} item 
     * @param {Funciton|undefined} callback
     */
    public update(item: Iitem,  callback?: (err?: any) => void): void {
        // Destructuring assignment
        const { currentSchema } = this;

        this.write<Iitem>(item, currentSchema, true).then(() => {
            if(typeof callback !== 'undefined') callback()
        }).catch((error) => {
            if(typeof callback !== 'undefined') callback(error);
        });

    }

    /**
     * Delete data
     * 
     * @override
     * @param {string} id 
     * @param {Function|undefined} callback
     */
    public delete(id: string, callback?: (err?: any) => void): void {
        // Destructuring assignment
        const { currentSchema } = this;

        this.writeDelete<Iitem>(currentSchema, `id == '${id}'`).then(() => {

            if(typeof callback !== 'undefined') callback();

        }).catch((error) => {

            if(typeof callback !== 'undefined') callback(error);

        });

    }

    /**
     * Delete all data
     * 
     * @override
     * @param {Function|undefined} callback
     */
    deleteAll(callback?: (err?: any) => void): void {
        // Destructuring assignment
        const { currentSchema } = this;

        this.writeDelete<Iitem>(currentSchema).then(() => {

            if(typeof callback !== 'undefined') callback();

        }).catch((error) => {

            if(typeof callback !== 'undefined') callback(error);

        });
    }

} 