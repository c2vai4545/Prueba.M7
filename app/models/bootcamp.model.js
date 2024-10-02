/**
 * Módulo que define el modelo de Bootcamp para la base de datos.
 * @module models/bootcamp
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

/**
 * Modelo de Bootcamp.
 * @typedef {Object} Bootcamp
 * @property {string} title - El título del bootcamp.
 * @property {number} cue - La duración del bootcamp en unidades de estudio (CUE).
 * @property {string} description - La descripción del bootcamp.
 */

/**
 * Define el modelo de Bootcamp en Sequelize.
 * @type {import('sequelize').Model}
 */
const Bootcamp = sequelize.define('Bootcamp', {
  /**
   * El título del bootcamp.
   * @type {string}
   */
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  /**
   * La duración del bootcamp en unidades de estudio (CUE).
   * @type {number}
   */
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 5,
      max: 10
    }
  },
  /**
   * La descripción del bootcamp.
   * @type {string}
   */
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Bootcamp;
