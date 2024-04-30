const express = require('express');
const router = express.Router();
const {refreshJWT} = require('../controllers/jwt-login-outController/refreshJWTController');

router.get('/', refreshJWT);

module.exports = router;