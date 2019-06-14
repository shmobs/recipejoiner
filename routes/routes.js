const router = require('express').Router();
const model = require('../models/model.js');

function sendAsJSON(req, res, next) {
  res.json(JSON.stringify(res.data));
}

router.get('/test', model.sendTestJsonResponse);
router.get('/categories', model.getAllCategories, sendAsJSON);
router.get('/recipes/:id', model.getOneRecipe, sendAsJSON);
router.get('/recipes', model.getAllRecipes, sendAsJSON);

module.exports = router;