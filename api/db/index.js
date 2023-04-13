const { Sequelize } = require('sequelize');
const config = require('../config/default.config');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        // This is for not showing some errors
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
        
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.data = require('./model/data.model')(sequelize, Sequelize)
db.companyData = require('./model/company.model')(sequelize, Sequelize)
db.industryData = require('./model/industry.model')(sequelize, Sequelize)
// console.log(db)


module.exports = db;