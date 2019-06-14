const { getDB } = require('../lib/dbconnection.js');

function sendTestJsonResponse(req, res, next) {
  const data = { status: 'it works!' };
  res.json(data);
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
  const { params } = req;
  const { id } = params || {};
  const intID = parseInt(id, 10);
  getDB().then((client) => {
    const db = client.db('codecation1');
    db.collection('recipes')
      .findOne({ recipe_id: intID })
      .then((data) => {
        res.data = data;
        next();
      })
      .catch(findError => next(findError));
  })
    .catch(dbError => next(dbError));
}

function createOneRecipe(req, res, next) {
  const { userID,
    categories,
    title,
    description } = req.body;

  // TODO: convert uploaded image into a URL
  const imageURL = '';

  getDB().then((client) => {
    const db = client.db('codecation1');
    db.collection('recipes')
      .insertOne({
        user_id: userID,
        recipe_id: Date.now(), // TODO: need better unique recipeID
        image_url: imageURL,
        categories,
        title,
        description,
      })
      .then((mongoResponse) => {
        const { ops } = mongoResponse || {};
        const insertedObject = ops[0] || {};
        res.data = insertedObject;
        next();
      })
      .catch(findError => next(findError));
  })
    .catch(dbError => next(dbError));
}

function editOneRecipe(req, res, next) {
  const { id } = req.params;
  const { userID,
    categories,
    title,
    description } = req.body;

  // TODO: convert uploaded image into a URL
  const imageURL = '';

  const intRecipeID = parseInt(id, 10);

  getDB().then((client) => {
    const db = client.db('codecation1');
    db.collection('recipes')
      .updateOne({ recipe_id: intRecipeID }, {
        $set: {
          user_id: userID,
          image_url: imageURL,
          categories,
          title,
          description,
        },
      })
      .then((mongoResponse) => {
        // const { ops } = mongoResponse || {};
        // const insertedObject = ops[0] || {};
        // res.data = insertedObject;
        res.data = { status: 200 };
        next();
      })
      .catch(findError => next(findError));
  })
    .catch(dbError => next(dbError));
}

function deleteOneRecipe(req, res, next) {
  const { id } = req.params;

  const intRecipeID = parseInt(id, 10);

  getDB().then((client) => {
    const db = client.db('codecation1');
    db.collection('recipes')
      .deleteOne({ recipe_id: intRecipeID })
      .then((mongoResponse) => {
        // const { ops } = mongoResponse || {};
        // const insertedObject = ops[0] || {};
        // res.data = insertedObject;
        res.data = { status: 200 };
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
  createOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
};
