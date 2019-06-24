import { Iitem } from './interfaces';

/**
 * Modal Class
 */
export default class Item implements Iitem {

    /**
     * Atributes
     */
    private _id: string;
    private _name: string;
    private _price: number | null;
    private _quantity: number;
    private _unit: string;
    private _category: string;
    private _date: Date;
    
    /**
     * Item
     * 
     * @constructor
     * @param id
     * @param name 
     * @param price 
     * @param quantity 
     * @param unit 
     * @param category 
     */
    constructor(id: string, name: string, price: number | null, quantity: number, unit: string, category: string, date: Date) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
        this.category = category;
        this.date = date;

    }

    /**
     * Methods Getters and Setters
     */

    public get id() {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get price(): number | null {
        return this._price;
    }

    public set price(price: number | null) {
        this._price = price;
    }

    public get quantity() {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }

    public get unit(): string {
        return this._unit;
    }

    public set unit(unit: string) {
        this._unit = unit;
    }

    public get category(): string {
        return this._category;
    }

    public set category(category: string) {
        this._category = category;
    }

    public get date(): Date {
        return this._date;
    }

    public set date(date: Date) {
        this._date = date;
    }

}