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
        phone_number : {
            type : Sequelize.STRING,
            required : true,
            unique : true,
            allowNull : false
        },
        address : {
            type : Sequelize.STRING,
            required : true,
            unique : true,
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
        }
    })
    return User;
}