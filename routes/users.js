const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const ctrlEmail = require('../middleware/ctrlEmail');
const ctrlPassword = require('../middleware/ctrlPassword');


router.post('/signup', ctrlEmail, ctrlPassword, userCtrl.CreateUser);
router.post('/login', ctrlEmail, userCtrl.Login);

module.exports = router;