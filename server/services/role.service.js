const db = require('../models');

const createRole = async (roleName) => {
  const existingRole = await db.Role.findOne({ where: { role_name: roleName } });
  if (existingRole) {
    throw new Error('Role already exists');
  }
  return await db.Role.create({ role_name: roleName });
};

const assignRoleToUser = async (userId, roleId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const role = await db.Role.findByPk(roleId);
  if (!role) {
    throw new Error('Role not found');
  }

  await db.UserRole.create({
    user_id: userId,
    role_id: roleId
  });

  return { message: 'Role assigned successfully' };
};

module.exports = {
  createRole,
  assignRoleToUser
};