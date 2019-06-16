const router = require('express').Router();
const model = require('../models/model.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

router.route('/test')
  .get(model.sendTestJsonResponse);

router.route('/categories')
  .get(model.getAllCategories, sendAsJSON);

router.route('/recipes/:id')
  .get(model.getOneRecipe, sendAsJSON)
  .put(model.editOneRecipe, model.getOneRecipe, sendAsJSON)
  .delete(model.deleteOneRecipe, sendAsJSON);

router.route('/recipe/:id')
  .get(model.getOneRecipe, sendAsJSON)
  .put(model.editOneRecipe, model.getOneRecipe, sendAsJSON)
  .delete(model.deleteOneRecipe, sendAsJSON);

router.route('/recipes')
  .get(model.getAllRecipes, sendAsJSON)
  .post(model.createOneRecipe, sendAsJSON);

module.exports = router;
