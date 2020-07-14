const Sequelize = require('sequelize');

const connection = new Sequelize('blog', 'root', 'postgres',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;