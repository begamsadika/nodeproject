const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectAllocationHistory = sequelize.define('ProjectAllocationHistory', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  
  allocation_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE(6), // DATETIME(6) equivalent
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN, // BIT(1) maps to BOOLEAN
    allowNull: false
  }
}, {
  tableName: 'project_allocation_history',
  timestamps: false
});

module.exports = ProjectAllocationHistory;