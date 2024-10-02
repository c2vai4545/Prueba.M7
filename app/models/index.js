/**
 * Módulo principal para la configuración y exportación de modelos de la base de datos.
 * @module models/index
 */

const sequelize = require('../config/db.config.js');
const User = require('./user.model.js');
const Bootcamp = require('./bootcamp.model.js');

/**
 * Definición de las relaciones entre los modelos User y Bootcamp.
 * Se establece una relación muchos a muchos entre User y Bootcamp.
 */
User.belongsToMany(Bootcamp, { through: 'UserBootcamp' });
Bootcamp.belongsToMany(User, { through: 'UserBootcamp' });

/**
 * Exporta los modelos y la instancia de Sequelize para su uso en otras partes de la aplicación.
 * @property {Sequelize} sequelize - Instancia de Sequelize para la conexión a la base de datos.
 * @property {Model} User - Modelo de Usuario.
 * @property {Model} Bootcamp - Modelo de Bootcamp.
 */
module.exports = {
  sequelize,
  User,
  Bootcamp
};
