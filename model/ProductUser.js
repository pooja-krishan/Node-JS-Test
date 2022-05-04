const { users, products } = require('.');
module.exports = (sequelize,DataTypes) => {
const ProductUser = sequelize.define('ProductUser', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // 'Movies' would also work
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products', // 'Actors' would also work
        key: 'id'
      }
    }
  });
  return ProductUser;
}