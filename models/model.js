const { getDB } = require('../lib/dbconnection.js');

function sendTestJsonResponse(req, res, next) {
  const data = { status: 'it works!' };
  res.json(data);
}

function getAllCategories(req, res, next) {
  const { user: userID } = req.query;
  // TODO: add input validation
  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .distinct('categories', { user_id: userID })
      .then((data) => {
        res.data = { categories: data };
        next();
      })
      .catch(findError => next(findError));
  })
    .catch(dbError => next(dbError));
}

function getAllRecipes(req, res, next) {
  const { user: userID } = req.query;
  // TODO: add input validation
  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .find({ user_id: userID })
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

  const { user: userID } = req.query;
  // TODO: add input validation
  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .findOne({ recipe_id: intID, user_id: userID })
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

  const finalUserID = userID || req.query.user;

  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .insertOne({
        user_id: finalUserID,
        recipe_id: Date.now(), // TODO: better unique recipeID
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

  const finalUserID = userID || req.query.user;

  const intRecipeID = parseInt(id, 10);

  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .updateOne({ recipe_id: intRecipeID, user_id: finalUserID }, {
        $set: {
          user_id: finalUserID,
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

  const { user: userID } = req.query;
  // TODO: add input validation

  getDB().then((client) => {
    const db = client.db(process.env.MONGODB_DBNAME);
    db.collection('recipes')
      .deleteOne({ recipe_id: intRecipeID, user_id: userID })
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
