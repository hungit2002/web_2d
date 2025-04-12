const db = require('../models');

const getUserById = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return await user.update(updateData);
};

module.exports = {
  getUserById,
  updateUser
};