/**
 * Módulo que define el modelo de Usuario para la base de datos.
 * @module models/user
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

/**
 * Modelo de Usuario.
 * @typedef {Object} User
 * @property {string} firstName - El nombre del usuario.
 * @property {string} lastName - El apellido del usuario.
 * @property {string} email - El correo electrónico del usuario.
 */

/**
 * Define el modelo de Usuario en Sequelize.
 * @type {import('sequelize').Model}
 */
const User = sequelize.define('User', {
  /**
   * El nombre del usuario.
   * @type {string}
   */
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  /**
   * El apellido del usuario.
   * @type {string}
   */
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  /**
   * El correo electrónico del usuario.
   * @type {string}
   */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

module.exports = User;
