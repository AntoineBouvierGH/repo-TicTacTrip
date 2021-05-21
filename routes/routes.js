const express = require('express');
const router = express.Router();
const apiControllerToken = require('../controllers/tokenController.js');
const apiControllerJustify = require('../controllers/justifyController.js');

router.post('/token', apiControllerToken.getTheToken);
router.post('/justify', apiControllerJustify.justifyThisContent);

module.exports = router;