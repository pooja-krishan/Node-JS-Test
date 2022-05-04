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
    }).catch(() => {
        console.log(err);
        res.send({"message ": err});
    });
}

const viewCart = async (req, res) => {
    console.log(req);
    let userId = req.params.userId;
    console.log('userid',userId);
    // const product_user = await Cart.findOne({
    //     where : {
    //         userId : userId
    //     }
    // })
    // const productId = product_user.productId;
    // console.log(productId);
    // const carts = await Cart.findOne({
    //     include : [ {
    //         model : 'products'
    //     } ],
    //     where : {
    //         productId : productId
    //     }
    // }).then(() => {
    //     if(carts == null)
    //     {
    //         return res.status(200).send("No products added to cart");
    //     }
    //     res.status(200).send(carts)
    // }).catch((err) => {
    //     console.log(err);
    //     res.send({"message ": err});
    // });
    try 
    {
        // const user = await User.findByPk(1);
        // console.log(user);
        // const products = await user.getProducts();
        const cart_mapping = await Cart.findOne({
            where : {
                UserId : userId
            }
        })
        console.log('cart mapping',cart_mapping);
        if(!cart_mapping)
        {
            return res.status(200).send({"message" : "Cart is empty"});
        }
        const productId = cart_mapping.dataValues.ProductId;
        console.log(productId);
        const products = await Product.findOne({
            where : {
                id : productId
            }
        })
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