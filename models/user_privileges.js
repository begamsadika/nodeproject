// models/user_privileges.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPrivileges = sequelize.define('UserPrivileges', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  
}, {
  tableName: 'user_privileges',
  timestamps: false
});

module.exports = UserPrivileges;
