const db = require ('../model/index');
const schema = require('../middlewares/validationMiddleware');
const cartController = require('./cartController')
const { products, users } = require('../model/index');
const OrderCart = db.ordercart;
const Orders = db.orders;
const Cart = db.cart;
const User = db.users;
const Product = db.products;

const addOrders = async (req, res) => {
    let userId = req.params.userId;
    console.log(userId);
    const user = await User.findOne({
        where : {
            id : userId
        }
    });
    console.log(user);
    var first_name = user.first_name;
    var last_name = user.last_name;
    var shipping_address = user.address;
    const order = await Orders.create({
        UserId : userId,
        first_name : first_name,
        last_name : last_name,
        shippingAddress : shipping_address
    })
    .then((result) => {
        // console.log(result);
        console.log({"message":"Order placed successfully"})
        return result
    })
    .catch((err) => {
        console.log(err);
        console.log({"message ": err.errors[0].message});
    });
    console.log(order);
    let orderId = order.dataValues.id;
    const cart_mapping = await Cart.findAll({
        where : {
            UserId : userId,
            isActive : true
        }
    })
    console.log('cart mapping',cart_mapping);
    if((cart_mapping.length)===0)
    {
        return res.status(200).send({"message" : "Cart is empty"});
    }
    const productId = [];
    for(let i = 0; i < cart_mapping.length; i++) {
        productId.push(cart_mapping[i].dataValues.ProductId);
    }
    console.log(productId);
    var i = 0;
    const products = []
    while(i<productId.length)
    {
        products.push(await Product.findOne({
            where : {
                id : productId[i]
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        }));
        products.push(await Cart.findOne({
            where : {
                ProductId : productId[i]
            },
            attributes : {
                include : ['qty'],
                exclude : [ 'UserId','createdAt','updatedAt']
            }
        }));
        i+=1;
    }      
    console.log(products);
    // var UserId = req.params.userId;
    let quantity = [];
    for(var i =1; i<products.length; i=i+2){
        quantity.push(products[i].dataValues.qty);
    }
    console.log('quantity',quantity);
    let price = [];
    for(var i=0; i<products.length-1;i=i+2)
    {
        price.push(products[i].dataValues.price);
    }
    console.log('price',price);
    var amount_total = 0;
    for (var i=0; i<price.length;i++){
        amount_total = amount_total+price[i];
    }
    var order_total = 0;
    for (var i=0; i<quantity.length;i++){
        order_total = order_total+quantity[i];
    }
    for(var i = 0; i<price.length;i++)
    {
        var orderCart = await OrderCart.create({
            OrderId : orderId,
            ProductId : productId[i],
            quantity : quantity[i],
            price : price[i]
        }).then((orderCart) => {
            console.log({"message" : "Data successfully inserted into OrderCart"});
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    var order_update = await Orders.update({
        amount_total : amount_total,
        order_total : order_total
    },{
        where : {
            id : orderId
        }
    })
    .then(async () => {
        const finalOrder = await Orders.findAll({
            where : {
                id : orderId
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        });
        if(!finalOrder){
            return res.status(200).send({"message" : "Order not found"});
        }
        var cart_empty = await Cart.update({
            isActive : false
        },{
            where : {
                UserId : userId
            }
        })
        res.status(200).send(finalOrder);
    });
}

module.exports = {
    addOrders
}