const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path if needed

const Designation = sequelize.define('designation', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  designation_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'designation',  // exact table name in DB
  timestamps: false          // disable createdAt, updatedAt
});

module.exports = Designation;
