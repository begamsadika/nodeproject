const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Defect = sequelize.define('defect',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    defect_id:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true
    },
    description:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  re_open_count:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  steps:{
    type: DataTypes.STRING(255),
    allowNull: false,
    
  },
    assigned_by:{
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'user', // This is the table name, not the variable
      key: 'id'
    }
  },
  assigned_to :{
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'user', // This is the table name, not the variable
      key: 'id'
    }
  },
  attachment:{
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  
  }, {
  tableName: 'defect',
  timestamps: false

});

module.exports = Defect;