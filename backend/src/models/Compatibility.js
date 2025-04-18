const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Compatibility = sequelize.define('Compatibility', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  userId2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  compatibilityScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  aspects: {
    type: DataTypes.JSON,
    allowNull: false
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  relationshipType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['amorosa', 'amistad', 'laboral', 'familiar']]
    }
  }
});

// Relaciones
Compatibility.belongsTo(User, { as: 'User1', foreignKey: 'userId1' });
Compatibility.belongsTo(User, { as: 'User2', foreignKey: 'userId2' });
User.hasMany(Compatibility, { as: 'Compatibilities1', foreignKey: 'userId1' });
User.hasMany(Compatibility, { as: 'Compatibilities2', foreignKey: 'userId2' });

module.exports = Compatibility; 