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
    }
  });
  return ProductUser;
}