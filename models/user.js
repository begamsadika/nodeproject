const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path if needed

const User = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone_no: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  join_date: {
    type: DataTypes.DATE(6),
    allowNull: false
  },
  user_gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE'),
    allowNull: false
  },
  user_status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
    allowNull: false
  },
  
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;
