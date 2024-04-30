const express = require('express');
const router = express.Router();
const {logoutJWT} = require('../controllers/jwt-login-outController/logoutJWTController');

router.get('/', logoutJWT);

module.exports = router;