const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Severity = sequelize.define('severity', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  severity_color: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  severity_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
}, {
  tableName: 'severity',   // Custom table name (optional)
  timestamps: false        // Disable createdAt/updatedAt
});

module.exports = Severity;
