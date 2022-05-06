const { users, products } = require('.');
module.exports = (sequelize,DataTypes) => {
const ProductUser = sequelize.define('ProductUser', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    qty : {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate : {
        min : 0
      }
    },
    isActive : {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    }
  });
  return ProductUser;
}