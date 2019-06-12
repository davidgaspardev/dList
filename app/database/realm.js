/**
 * Realm
 * 
 * @author David Gaspar
 */
import Realm from 'realm';
import Config from './config.json';

// Instace of Realm (database)
const db = new Realm(Config);

/**
 * Asynchonous Function
 * 
 * @param {string} schemaName
 * @param {Object} data
 */
async function write(schemaName, data) {
	// Write in database
	await db.write(() => {
		db.create(schemaName, data);
	});
}

/**
 * Function 
 * 
 * @param {Object} schemaName 
 * @param {?string} filter
 * @returns {Object}
 */
function read(schemaName, filter) {
	// Datas of database
	let datas = null;

	if(typeof filter === 'string') datas = db.objects(schemaName).filtered(filter);
	else datas = db.objects(schemaName);

	console.log

	return datas;
}

export { write, read };