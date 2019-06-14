const mongodb = require('mongodb');
const { MongoClient } = mongodb;

function getDB() {
	return MongoClient.connect('mongodb://localhost:27017');
}

module.exports = {
	getDB,
};