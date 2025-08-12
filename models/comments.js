const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comments =sequelize.define('comments',{
     id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  attachment:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  defect_id :{
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'defect', // This is the table name, not the variable
      key: 'id'
    }
  },
   user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'user', // This is the table name, not the variable
      key: 'id'
    }
  }
  }, {
  tableName: 'comments',
  timestamps: false
});

module.exports = Comments;