const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');
const { authenticatateJWT } = require('../middleware/authenticator');

router.post('/', authenticatateJWT, authorController.create);
router.get('/', authorController.readAll);

module.exports = router;
