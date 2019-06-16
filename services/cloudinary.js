const cloudinary = require('cloudinary').v2;
const path = require('path');

function uploadImage(req, res, next) {
  const { filename } = req.file;
  const localImagePath = path.join(__dirname, '../uploads/', filename);
  const { recipeID } = res;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  cloudinary.uploader.upload(localImagePath, { public_id: recipeID }, (err, result) => {
    if (err) return next(err);
    res.cloudinaryResponse = result;
    return next();
  });
}

module.exports = {
  uploadImage,
};
