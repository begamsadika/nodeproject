const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const Project = sequelize.define('project', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  project_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(1000)
  },
  
  start_date: {
    type: DataTypes.DATE(6),
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE(6),
    allowNull: true
  },
  kloc: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  project_status: {
    type: DataTypes.ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
    allowNull: false
  }
}, {
  tableName: 'project',
  timestamps: false
});

module.exports = Project;
