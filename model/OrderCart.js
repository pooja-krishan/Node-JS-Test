const { orders } = require('.');
module.exports = (sequelize,DataTypes) => {
const OrderCart = sequelize.define('OrderCart', {
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders', 
        key: 'id'
      }
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity : {
        type: DataTypes.JSON,
        // defaultValue: 0,
        // get: function() {
        //   return JSON.parse(this.getDataValue("quantity"));
        // },
        // set: function(value) {
        //   return this.setDataValue("quantity", JSON.stringify(value));
        // },
        // validate : {
        //   min : 0
        // }
      },
      price : {
        type: DataTypes.JSON,
        // get: function() {
        //     return JSON.parse(this.getDataValue("price"));
        //   },
        //   set: function(value) {
        //     return this.setDataValue("price", JSON.stringify(value));
        //   },
        // validate : {
        //   min : 0
        // }
    }
});
  return OrderCart;
}