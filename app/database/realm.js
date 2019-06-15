/**
 * Realm
 * CRUD: create, read, update and delete
 * 
 * @author David Gaspar
 */
import Realm from 'realm';
import Config from './config.json';

// Instance of Realm (database)
const db = new Realm(Config);

/**
 * Asynchonous Function
 * 
 * @description Create data in database (Realm)
 * @param {string} schemaName
 * @param {Object} data
 */
async function _create(schemaName, data) {
	// Write in database
	await db.write(() => {
		db.create(schemaName, data);
	});
}

/**
 * Function 
 * 
 * @description Read data from database (Realm)
 * @param {Object} schemaName 
 * @param {?string} filter
 * @returns {Object}
 */
function _read(schemaName, filter) {
	// Datas of database
	let datas = null;

	if(typeof filter === 'string') datas = db.objects(schemaName).filtered(filter);
	else datas = db.objects(schemaName);

	return datas;
}

/**
 * Asynchonous Function
 * 
 * @description Update data from database (Realm)
 * @param {string} schemaName 
 * @param {Object} data 
 */
async function _update(schemaName, data) {
	await db.write(() => {
		db.create(schemaName, data, true);
	});
}

/**
 * Function
 * 
 * @description Delete data from database (Realm)
 * @param {string} schemaName 
 * @param {Object} id 
 */
function _delete(schemaName, id) {
	let data = db.objects(schemaName).filtered(`id === '${id}'`);
	db.delete(data);
}

export { _create, _read, _delete };