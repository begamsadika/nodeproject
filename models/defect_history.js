const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Defect_history =sequelize.define('defect_history',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    assigned_by:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    assigned_to:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    defect_date : {
    type: DataTypes.DATE(6),
    allowNull: false
    },
    defect_ref_id:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    defect_status:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    defect_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    
    previous_status:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    record_status:{
    type: DataTypes.STRING(255),
    allowNull: false
    },
    release_id:{
        type:DataTypes.BIGINT,
    allowNull: false
    }
  }, {
  tableName: 'defect_history',
  timestamps: false
});

module.exports = Defect_history;