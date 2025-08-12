const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_project', 'root', 'begam', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Disable SQL query logging
});

module.exports = sequelize;
