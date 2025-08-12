const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Email_user = sequelize.define('email_user',{
    id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  
    defect_email_status:{
    type: DataTypes.BIGINT,
    allowNull: false
    },
    module_allocation_email_status:{
    type: DataTypes.BIGINT,
    allowNull: false
    },
    project_allocation_email_status :{
    type: DataTypes.BIGINT,
    allowNull: false
    },
    submodule_allocation_email_status:{
    type: DataTypes.BIGINT,
    allowNull: false
    }
  }, {
  tableName: 'email_user',
  timestamps: false
});

module.exports = Email_user;
