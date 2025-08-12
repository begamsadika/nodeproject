const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Release =sequelize.define('release',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    release_id:{
        type:DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    release_name:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
  releasedate:{
    type: DataTypes.DATE(6),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN, // BIT(1) in MySQL maps to BOOLEAN
    allowNull: false
  },
  description:{
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  release_status:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  
},
    {
        tableName:'release',
        timestamps:false

    }
);

module.exports = Release;
