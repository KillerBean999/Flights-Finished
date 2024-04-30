const express = require('express');
const router = express.Router();
const {adminLoginC} = require('../controllers/jwt-login-outController/loginAdmin');

router.post('/', adminLoginC);

module.exports = router;