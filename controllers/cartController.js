const db = require ('../model/index');
const schema = require('../middlewares/validationMiddleware');
const { products, users } = require('../model/index');
const Cart = db.cart;
const Product = db.products;
const User = db.users;

const addToCart = async (req, res) => {
    let values = {
        ProductId : req.body.productId,
        UserId : req.body.userId
    }
    const product = await Product.findOne({
            where : {
            id : req.body.productId
        }}
    )
    if(!product)     //Is this check necessary since the product should not be called unless it exists 
    {
        return res.status(200).send({"message" : "Product does not exist"});
    }
    console.log(product.count-1);
    const cart = await Cart.create(values).then(() => {
        // const product_update = Product.update({ count : product.count-1 }, {
        //     where : {
        //         id : product.id
        //     }
        // })
        res.status(200).send(`Item ${ req.body.productId } added to cart of user ${ req.body.userId }`)
    }).catch((err) => {
        console.log(err);
        res.send({"message ": err});
    });
}

const viewCart = async (req, res) => {
    console.log(req);
    let userId = req.params.userId;
    console.log('userid',userId);
    try 
    {
        const cart_mapping = await Cart.findAll({
            where : {
                UserId : userId
            }
        })
        console.log('cart mapping',cart_mapping);
        if(!cart_mapping)
        {
            return res.status(200).send({"message" : "Cart is empty"});
        }
        const productId = [];
        for(let i = 0; i < cart_mapping.length; i++) {
            productId.push(cart_mapping[i].dataValues.ProductId);
        }
        console.log(productId);
        let i = 0;
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
            i+=1;
        }
        console.log(products);
        res.status(200).send(products);
    }
    catch(err)
    {
        console.log(err);
        res.send({"error" : err});
    }
}

module.exports = {
    addToCart,
    viewCart
}