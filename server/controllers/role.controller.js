const { createRole, assignRoleToUser } = require('../services/role.service');

const createRoleHandler = async (req, res) => {
  try {
    const { role_name } = req.body;
    const result = await createRole(role_name);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const assignRoleHandler = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const result = await assignRoleToUser(userId, roleId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRoleHandler,
  assignRoleHandler
};