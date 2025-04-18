const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Reading = sequelize.define('Reading', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('past', 'present', 'future', 'love', 'career', 'general'),
    allowNull: false
  },
  cards: {
    type: DataTypes.JSON,
    allowNull: false
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Definir la relación con User
Reading.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Reading, { foreignKey: 'userId' });

module.exports = Reading; 