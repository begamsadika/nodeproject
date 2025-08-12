
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Bench = sequelize.define('bench',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
    bench_id:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    allocated:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    availability:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
}, {
  tableName: 'bench', // Adjust to match your DB table name
  timestamps: false

});
module.exports = Bench;