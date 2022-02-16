const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

if (env !== 'test' && env !== 'ci') {
    try {
        sequelize.authenticate().then(() => {
            /* eslint-disable-next-line no-console */
            console.log('Connection has been established successfully.');
        });
    } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Unable to connect to the database:', error);
    }
}

fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        /* eslint-disable-next-line import/no-dynamic-require, global-require */
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
