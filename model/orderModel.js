const { users } = require('.');
module.exports = (sequelize,DataTypes) => {
const Orders = sequelize.define('Orders', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    first_name : {
      type: DataTypes.STRING,
      required: true,
      allowNull:false
    },
    last_name : {
      type: DataTypes.STRING,
      required: true,
      allowNull:false
    },
    amount_total : {
        type: DataTypes.INTEGER,
        defaultValue : 0,
        validate : {
          min : 0
        }
    },
    order_total : {
        type: DataTypes.INTEGER,
        defaultValue : 0,
        validate : {
          min : 0
        }
    },
    shippingAddress : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    },
    orderActive : {
        type : DataTypes.BOOLEAN,
        required : true,
        allowNull : false,
        defaultValue : true
    }
});
  return Orders;
}