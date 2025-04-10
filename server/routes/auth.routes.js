const express = require('express');
const router = express.Router();
const { registerUser, verifyRegistration, loginUser } = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/verify', verifyRegistration);
router.post('/login', loginUser);

module.exports = router; 