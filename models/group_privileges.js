const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Group_Privileges = sequelize.define('group_privileges',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    }
    
},{
    tableName:'group_privileges',
    timestamps:false
});

module.exports= Group_Privileges;
