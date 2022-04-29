module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('product',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        price : {
            type : DataTypes.FLOAT,
        },
        description : {
            type : DataTypes.TEXT
        },
        published : {
            type : DataTypes.BOOLEAN
        }
    });
    return Product;
}