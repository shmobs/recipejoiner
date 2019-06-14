const router = require('express').Router();
const model = require('../models/model.js');

router.get('/test', model.sendTestJsonResponse);

module.exports = router;