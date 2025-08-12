// models/release_test_case.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReleaseTestCase = sequelize.define('ReleaseTestCase', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  release_test_case_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  test_case_status: {
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Passed', 'Failed', 'Blocked'),
    allowNull: false
  },
  test_time: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'release_test_case',
  timestamps: false
});

module.exports = ReleaseTestCase;
