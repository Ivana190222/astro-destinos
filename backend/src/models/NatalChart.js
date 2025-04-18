const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const NatalChart = sequelize.define('NatalChart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sunSign: {
    type: DataTypes.ENUM('aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'),
    allowNull: false
  },
  moonSign: {
    type: DataTypes.ENUM('aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'),
    allowNull: false
  },
  ascendant: {
    type: DataTypes.ENUM('aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'),
    allowNull: false
  },
  planets: {
    type: DataTypes.JSON,
    allowNull: false
  },
  houses: {
    type: DataTypes.JSON,
    allowNull: false
  },
  aspects: {
    type: DataTypes.JSON,
    allowNull: false
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Definir la relación con User
NatalChart.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(NatalChart, { foreignKey: 'userId' });

module.exports = NatalChart; 