const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Allocate_module =sequelize.define('allocate_module',{
    id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  
  }, {
  tableName: 'allocate_module',
  timestamps: false

});

module.exports = Allocate_module;