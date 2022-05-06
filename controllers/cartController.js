const db = require ('../model/index');
const schema = require('../middlewares/validationMiddleware');
const { products, users } = require('../model/index');
const Cart = db.cart;
const Product = db.products;

const addToCart = async (req, res) => {
    let values = {
        ProductId : req.body.productId,
        UserId : req.body.userId,
        qty : 1
    }
    console.log(values);
    const product = await Product.findOne({
            where : {
            id : req.body.productId
        }}
    )
    if(!product)     //Is this check necessary since the product should not be called unless it exists 
    {
        return res.status(200).send({"message" : "Product does not exist"});
    }
    // console.log(product.count-1);
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
                    id : productId[i]
                },
                attributes : {
                    include : ['qty'],
                    exclude : [ 'UserId','createdAt','updatedAt']
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

const deleteFromCart = async (req, res) => {
    let productId = req.params.productId;
    let userId = req.params.userId;
    console.log(productId)
    try {
        const product = await Cart.findOne({
            where : {
                ProductId : productId,
                UserId : userId
            }
        })
        if(!product)
        {
            return res.status(200).send({"message" : "Product does not exist in cart"});
        }
        await Cart.destroy({
            where : {
                ProductId : productId,
                UserId : userId
            }
        })
        res.status(200).send({"message" : "Product successfully deleted from cart"});
    }
    catch(err) {
        res.send({"error" : err});
    }
}

const addQty = async (req, res) => {
    let productId = req.params.productId;
    let userId = req.params.userId;
    try {
        const cart = await Cart.findOne({
            where : {
                ProductId : productId,
                UserId : userId
            }
        })
        console.log(cart);
        if(!cart)
        {
            return res.status(200).send({"error" : "Product does not even exist in the cart"});
        }
        const quantity= cart.dataValues.qty;
        const cart_item = await Cart.update({
            qty : quantity+1
        },{
            where : {
                ProductId : productId,
                UserId : userId
            }
        });
        if(cart_item)
        {
            res.status(200).send({"message" : "Item count increased"});
        }
    }   
    catch(err) {
        res.send({"error" : err});
    }
}

const delQty = async (req, res) => {
    let productId = req.params.productId;
    let userId = req.params.userId;
    try {
        const cart = await Cart.findOne({
            where : {
                ProductId : productId,
                UserId : userId
            }
        })
        if(!cart)
        {
            return res.status(200).send({"error" : "Product does not even exist in the cart"});
        }        
        const quantity = cart.dataValues.qty;
        const cart_item = Cart.update({
            qty : quantity-1
        },{
            where : {
                ProductId : productId,
                UserId : userId
            }
        });
        if(cart_item)
        {
            res.status(200).send({"message" : "Item count decreased"});
        }
    }
    catch(err) {
        res.send({"error" : err});
    }
}

module.exports = {
    addToCart,
    viewCart,
    deleteFromCart,
    addQty,
    delQty
}