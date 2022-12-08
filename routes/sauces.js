//Importation des modules de gestion des routes et des middlewares pour la gestion d'authentification et des images
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
//Importation du controller contenant tt le code correspondants aux route des sauces
const sauceCtrl = require('../controllers/sauce');
//definition des routes  de type  POST
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
//definition des routes de type get
router.get('/', auth, sauceCtrl.listeSauces);
router.get('/:id', auth, sauceCtrl.oneSauce);
//definition des routes de type put
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
//definition des routes de type delete
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

module.exports = router;