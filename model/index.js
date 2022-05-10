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
db.cart = require('./ProductUser')(sequelize,DataTypes);
db.orders = require('./orderModel')(sequelize,DataTypes);
db.ordercart = require('./OrderCart')(sequelize,DataTypes);
// Associations
// db.products.belongsToMany(db.users, { through: db.cart });
// db.users.belongsToMany(db.products, { through: db.cart });

db.sequelize.sync( {force : false} )
.then(() => {
    console.log("Sync is complete");
});       //Does not drop tables while restarting nodemon

module.exports = db;