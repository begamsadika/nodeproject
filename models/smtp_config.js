const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Smtp_config = sequelize.define('smtp_config',{
     id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  from_email:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  from_name:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name :{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
    password:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
    smtp_host:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
    smtp_port :{
    type: DataTypes.STRING(255),
    allowNull: false
  },

    username :{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  }, {
  tableName: 'smtp_config',
  timestamps: false
});

module.exports = Smtp_config;