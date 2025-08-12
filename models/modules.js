const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Modules = sequelize.define('module', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  module_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  module_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
}, {
  tableName: 'modules', // Adjust to match your DB table name
  timestamps: false
});

module.exports = Modules;
