//Importation des modules de gestion des routes et des middlewares pour la gestion de verification
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const ctrlEmail = require('../middleware/ctrlEmail');
const ctrlPassword = require('../middleware/ctrlPassword');

//Definition des routes POST
router.post('/signup', ctrlEmail, ctrlPassword, userCtrl.CreateUser);
router.post('/login', ctrlEmail, userCtrl.Login);

module.exports = router;