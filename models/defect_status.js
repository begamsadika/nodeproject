const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DefectStatus = sequelize.define('defect_status', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  color_code: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  defect_status_name: {
    type: DataTypes.STRING(255), // Adjusted to VARCHAR(255)
    allowNull: false
  }
}, {
  tableName: 'defect_status', // Explicit table name
  timestamps: false           // No createdAt/updatedAt
});

module.exports = DefectStatus;
