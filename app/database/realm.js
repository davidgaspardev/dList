/**
 * Realm
 * 
 * @author David Gaspar
 */
const Realm  = require('realm');
const config = require('./config.json');
const db     = new Realm(config);

/**
 * Asynchonous Function
 * 
 * @param { obejct } schemaName
 * @param { obejct } data
 */
async function write(schemaName, data) {
	await db.write(function () {
		db.create(schemaName, data);
	});
}

/**
 * Function 
 * 
 * @param { obejct } schemaName 
 * @param { string } filter
 * @return { obejct }
 */
function read(schemaName, filter) {

	let datas = null;

	if(typeof filter === 'string') datas = db.objects(schemaName).filtered(filter);
	else datas = db.objects(schemaName);

	return datas;
}

export { write, read };