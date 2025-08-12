// models/project_allocation.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectAllocation = sequelize.define('ProjectAllocation', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  
  allocation_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE(6), // DATETIME(6) equivalent in Sequelize
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE(6),
    allowNull: true
  }
}, {
  tableName: 'project_allocation',
  timestamps: false
});

module.exports = ProjectAllocation;
