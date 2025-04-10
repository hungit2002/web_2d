const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models
const User = require('./User')(sequelize);
db.User = User;

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Error syncing database:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 