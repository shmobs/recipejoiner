const router = require('express').Router();
const model = require('../models/model.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

router.get('/test', model.sendTestJsonResponse);
router.get('/categories', model.getAllCategories, sendAsJSON);
router.get('/recipes/:id', model.getOneRecipe, sendAsJSON);
router.get('/recipes', model.getAllRecipes, sendAsJSON);
router.post('/recipes', model.createOneRecipe, sendAsJSON);

module.exports = router;