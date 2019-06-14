const mongodb = require('mongodb');

const { MongoClient } = mongodb;

function getDB() {
  return MongoClient.connect(process.env.MONGODB_URI);
}

module.exports = {
  getDB,
};
