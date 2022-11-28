const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', sauceCtrl.likeSauce);
router.get('/', auth, sauceCtrl.listeSauces);
router.get('/:id', auth, sauceCtrl.oneSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

module.exports = router;