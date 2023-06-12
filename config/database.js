const Sequelize = require('sequelize');
const { host, port, database, username, password } = require('./dbConfig');

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
