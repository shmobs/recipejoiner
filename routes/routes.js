const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const model = require('../models/model.js');
const cloudinary = require('../services/cloudinary.js');

function sendAsJSON(req, res, next) {
  res.json(res.data);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

router.route('/test')
  .get(model.sendTestJsonResponse);

router.route('/categories')
  .get(model.getAllCategories, sendAsJSON);

router.route('/recipes/:id')
  .get(model.getOneRecipe, sendAsJSON)
  .put(upload.single('image'), model.editOneRecipe, model.getOneRecipe, sendAsJSON)
  .delete(model.deleteOneRecipe, sendAsJSON);

router.route('/recipe/:id')
  .get(model.getOneRecipe, sendAsJSON)
  .put(upload.single('image'), model.editOneRecipe, model.getOneRecipe, sendAsJSON)
  .delete(model.deleteOneRecipe, sendAsJSON);

router.route('/recipes')
  .get(model.getAllRecipes, sendAsJSON)
  .post(upload.single('image'), model.generateRecipeID,
    cloudinary.uploadImage, model.createOneRecipe, sendAsJSON);

module.exports = router;
