const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DefectType = sequelize.define('defect_type', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  defect_type_name: {
    type: DataTypes.STRING(255), // Assuming full VARCHAR(255)
    allowNull: false
  }
}, {
  tableName: 'defect_type', // Exact table name in DB
  timestamps: false         // Disable createdAt and updatedAt
});

module.exports = DefectType;
