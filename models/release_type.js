const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReleaseType = sequelize.define('release_type', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  release_type_name: {
    type: DataTypes.STRING(25),
    allowNull: false
  }
}, {
  tableName: 'release_type', // Exact table name in the database
  timestamps: false          // Disable createdAt and updatedAt
});

module.exports = ReleaseType;
