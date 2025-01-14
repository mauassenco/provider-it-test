const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/users', registerController.handleNewUser);

module.exports = router;
