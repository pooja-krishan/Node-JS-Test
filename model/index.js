const dbConfig = require('../db/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,dbConfig.PASSWORD,{
    localhost : dbConfig.localhost,
    dialect : dbConfig.dialect,
    operatorsAliases : false,

    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.acquire,
        idle : dbConfig.idle
    }
});

sequelize.authenticate()
.then(() => {
    console.log('Connected');
})
.catch(err => {
    console.log("Error:",err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel.js')(sequelize,DataTypes);
db.users = require('./userModel.js')(sequelize,DataTypes);

db.sequelize.sync( {force : true} )
.then(() => {
    console.log("Sync is complete");
});       //Does not drop tables while restarting nodemon

module.exports = db;