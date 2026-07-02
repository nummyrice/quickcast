'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  const connectionUrl = process.env[config.use_env_variable];

  if (connectionUrl) {
    sequelize = new Sequelize(connectionUrl, config);
  } else {
    const username = process.env.DB_USERNAME || process.env.PGUSER;
    const password = process.env.DB_PASSWORD || process.env.PGPASSWORD;
    const database = process.env.DB_DATABASE || process.env.PGDATABASE;
    const host = process.env.DB_HOST || process.env.PGHOST;
    const port = process.env.DB_PORT || process.env.PGPORT;

    if (username && database && host) {
      sequelize = new Sequelize(database, username, password, {
        ...config,
        host,
        port,
      });
    } else {
      throw new Error(
        `Missing database connection settings. Expected ${config.use_env_variable} or split credentials (DB_USERNAME/DB_PASSWORD/DB_DATABASE/DB_HOST[/DB_PORT] or PGUSER/PGPASSWORD/PGDATABASE/PGHOST[/PGPORT]).`
      );
    }
  }
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
