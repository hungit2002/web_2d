const express = require('express');
const router = express.Router();
const { 
  getUsers,
  getUser, 
  createNewUser,
  updateUserProfile, 
  deleteUserById, 
  changePasswordHandler
} = require('../controllers/user.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();

// Public routes
router.get('/', getUsers);
router.get('/:id', getUser);

// Protected routes (admin only)
router.post('/', adminAuthMiddleware, createNewUser);
router.put('/:id', adminAuthMiddleware, upload.single('avatar'), updateUserProfile);
router.delete('/:id', adminAuthMiddleware, deleteUserById);

// Add this new route
router.put('/:id/change-password', adminAuthMiddleware, changePasswordHandler);

module.exports = router;