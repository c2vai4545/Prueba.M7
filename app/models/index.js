const sequelize = require('../config/db.config.js');
const User = require('./user.model.js');
const Bootcamp = require('./bootcamp.model.js');

// Definir las relaciones entre los modelos
User.belongsToMany(Bootcamp, { through: 'UserBootcamp' });
Bootcamp.belongsToMany(User, { through: 'UserBootcamp' });

module.exports = {
  sequelize,
  User,
  Bootcamp
};
