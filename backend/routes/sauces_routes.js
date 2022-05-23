const express = require('express');
const router = express.Router();
const saucesControllers = require('../controllers/sauces_controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const inputValidator = require('../middleware/inputValidator')

router.get('/', auth, saucesControllers.getSauces);
router.get('/:id', auth, saucesControllers.getOneSauces);
router.post('/', auth, inputValidator,  multer, saucesControllers.createSauce);
router.put('/api/sauces/:id', auth, inputValidator, multer, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.post('/:id/like', auth, saucesControllers.like);

module.exports = router;