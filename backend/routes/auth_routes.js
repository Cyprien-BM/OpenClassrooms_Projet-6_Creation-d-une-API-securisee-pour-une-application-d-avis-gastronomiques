const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controllers');
const passwordValidator = require('../middleware/password-validator');
const rateLimit = require('express-rate-limit')

// Limiter for IP request
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
  message: "Trop de requêtes HTTP pour cet IP, veuillez réessayer ultérieurement"
});
//----------------------------------------------//

router.post('/signup', passwordValidator, authController.signeUp);
router.post('/login', limiter, passwordValidator, authController.login);

module.exports = router;