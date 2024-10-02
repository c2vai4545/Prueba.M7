const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Bootcamp = sequelize.define('Bootcamp', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 5,
      max: 10
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Bootcamp;
