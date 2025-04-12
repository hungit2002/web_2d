const { getUserById, updateUser } = require('../services/user.service');
const path = require('path');
const fs = require('fs');

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let avatarPath = null;
    
    if (req.file) {
      // Update path to be relative to server directory
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

module.exports = {
  getUser,
  updateUserProfile
};