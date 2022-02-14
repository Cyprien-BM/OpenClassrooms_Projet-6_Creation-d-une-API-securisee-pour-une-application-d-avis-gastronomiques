const express = require('express');
const router = express.Router();
const saucesControllers = require('../controllers/sauces_controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const inputValidator = require('../middleware/inputValidator')

router.get('/', saucesControllers.getSauces);
router.get('/:id', auth, saucesControllers.getOneSauces);
router.post('/', auth, multer, saucesControllers.createSauce);
router.put('/:id', auth, multer, inputValidator, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.post('/:id/like', auth, saucesControllers.like);

module.exports = router;