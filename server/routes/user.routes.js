const express = require('express');
const router = express.Router();
const { getUser, updateUserProfile } = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer();

router.get('/:id', getUser);
router.put('/:id', upload.single('avatar'), updateUserProfile);

module.exports = router;