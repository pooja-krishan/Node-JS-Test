module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('product',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        price : {
            type : DataTypes.FLOAT,
            // validate : {
            //     isNumeric : true
            // }
        },
        description : {
            type : DataTypes.TEXT
        },
        count : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                min : 0
            }
        },
        published : {
            type : DataTypes.BOOLEAN
        }
    });
    return Product;
}