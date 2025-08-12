const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const SubModule = sequelize.define('sub_module', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  sub_module_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  sub_module_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
 
}, {
  tableName: 'sub_module',  // exact table name in the database
  timestamps: false         // disables createdAt and updatedAt
});

module.exports = SubModule;
