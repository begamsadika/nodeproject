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
  project_id: {
    type: DataTypes.BIGINT,
    allowNull: true, // Assuming it can be null based on your migration, adjust if needed
    references: {
      model: 'project',
      key: 'id'
    }
  },
  modules_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'modules',
      key: 'id'
    }
  },
  sub_module_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'sub_module',
      key: 'id'
    }
  },
  release_test_case_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'release_test_case',
      key: 'id'
    }
  },
  severity_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  type_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'defect_type',
      key: 'id'
    }
  },
  defect_status_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  priority_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'priority',
      key: 'id'
    }
  }
  
  }, {
  tableName: 'defect',
  timestamps: false

});

module.exports = Defect;