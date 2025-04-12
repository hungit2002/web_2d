const { JWT_SECRET, verifyToken } = require('../config/jwt');
const db = require('../models');
const { ADMIN_ROLE_NAME } = require('../constant');

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = verifyToken(token, JWT_SECRET);    
    
    const user = await db.User.findOne({
      where: { id: decoded.id },
      include: [{
        model: db.Role,
        as: 'roles',
        through: { attributes: [] }
      }]
    });

    if (!user || !user.roles.some(role => role.role_name === ADMIN_ROLE_NAME)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  adminAuthMiddleware
};