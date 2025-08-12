const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testcase =sequelize.define('testcase',{
    id : {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  test_case_id :{
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  description :{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
    steps:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
}, {
  tableName: 'testcase',  // exact table name in the database
  timestamps: false 


});

module.exports = Testcase;