// models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'role',
  timestamps: false
});

module.exports = Role;
