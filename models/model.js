const { getDB } = require('../lib/dbconnection.js');

function sendTestJsonResponse(req, res, next) {
	const data = { status: 'it works!' };
	res.setHeader('Content-Type', 'application/json');
	res.json(JSON.stringify(data));
}

function getAllCategories(req, res, next) {
	getDB().then((client) => {
		const db = client.db('codecation1');
		db.collection('recipes')
		.distinct('categories', {})
		.then((data) => {
			res.data = { categories: data };
			next();
		})
		.catch(findError => next(findError));
	})
	.catch(dbError => next(dbError));
}

function getAllRecipes(req, res, next) {
	getDB().then((client) => {
		const db = client.db('codecation1');
		db.collection('recipes')
		.find({})
		.toArray()
		.then((data) => {
			res.data = data;
			next();
		})
		.catch(findError => next(findError));
	})
	.catch(dbError => next(dbError));
}

function getOneRecipe(req, res, next) {
	const id = parseInt(req.params.id, 10);
	getDB().then((client) => {
		const db = client.db('codecation1');
		db.collection('recipes')
		.find({ recipe_id: id })
		.toArray()
		.then((data) => {
			res.data = data;
			next();
		})
		.catch(findError => next(findError));
	})
	.catch(dbError => next(dbError));
}

module.exports = {
	sendTestJsonResponse,
	getAllCategories,
	getAllRecipes,
	getOneRecipe,
}
