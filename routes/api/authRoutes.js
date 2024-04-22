const express = require('express');

const {
  loginUser,
	signupUser,
	getProfile,
} = require('../../controllers/AuthController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/profile', getProfile);

module.exports = router;
