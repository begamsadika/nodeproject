const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const Priority = sequelize.define('priority', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  color: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  priority: {
    type: DataTypes.STRING(1000)
  },
  
}, {
  tableName: 'priority',
  timestamps: false
});

module.exports = Priority;
