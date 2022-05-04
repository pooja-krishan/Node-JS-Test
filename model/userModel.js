const {Sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('user', {
        first_name : {
            type :Sequelize.STRING,
            required : true,
            allowNull : true
        },
        last_name : {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        email : {
            type : Sequelize.STRING,
            required : true,
            unique : true,
            allowNull : false
        },
        password : {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        cart_count : {
            type : Sequelize.STRING,
            defaultValue : 0,
        }
    })
    return User;
}