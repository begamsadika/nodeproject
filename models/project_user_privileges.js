// models/project_user_privileges.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectUserPrivileges = sequelize.define('ProjectUserPrivileges', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  
}, {
  tableName: 'project_user_privileges',
  timestamps: false
});

module.exports = ProjectUserPrivileges;
