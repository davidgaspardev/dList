/**
 * Properties
 * 
 * @author David Gaspar
 * @flow 
 */

export type Main = {};

export type Item = {
    id: string,
    name: string,
	price: number,
	quantity: number,
	unit: string,
	category: string
};

export type AddItem = {
    eventCloseAddItem(): void
};