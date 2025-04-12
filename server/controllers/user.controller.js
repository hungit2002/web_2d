const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  changePassword
} = require('../services/user.service');
const path = require('path');
const fs = require('fs');

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllUsers(page, limit, search);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let avatarPath = null;
    
    if (req.file) {
      const uploadDir = path.join(__dirname, '../uploads/avatar');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${req.params.id}-${Date.now()}${path.extname(req.file.originalname)}`;
      avatarPath = path.join('avatar', fileName);
      
      fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
    }

    const updatedUser = await updateUser(req.params.id, {
      ...req.body,
      ...(avatarPath && { avatar: avatarPath })
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePasswordHandler = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;
    
    const result = await changePassword(userId, { newPassword });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add to exports
module.exports = {
  getUsers,
  getUser,
  createNewUser,
  updateUserProfile,
  deleteUserById,
  changePasswordHandler
};