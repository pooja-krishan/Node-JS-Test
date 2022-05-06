const db = require('../model');
const schema = require('../middlewares/validationMiddleware')

const Product = db.products;

// Add product
const addProduct = async(req, res) => {
    const {error} = schema.product_schema(req.body)
    // res.send(validation);
    if(error) {
        res.send({"error" : error.message});
        return;
    }
    let info = {
        title : req.body.title,
        price : req.body.price,
        description : req.body.description,
        count : req.body.count,
        published : req.body.published ? req.body.published : false
    }
    // const {result} = schema.validate(info)
    const product = await Product.create(info).then(() => {
        res.status(200).send({"message":"Product added successfully"});
    })
    .catch((err) => {
        console.log(err);
        res.send({"message ": "Duplicate entry :" + err.errors[0].message});
    });
}

//Get all products

const getProducts = async(req, res) => {
    try {
        let products = await Product.findAll();
    // {
    //     attributes : [
    //         'title',     // Can be used to find and return particular attributes
    //         'price'
    //     ]
    // } );
        if(products.length === 0)
        {
            res.status(200).send({"error" : "No products found"}); 
        }
        else
        {
            res.status(200).send(products);
        }
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).send({ error: err });
    }
}

//Get single product

const getOneProduct = async(req, res) => {
    try {
        let id = req.params.productid;
        const product = await Product.findOne({
            where : {
                id : id
            }
        });
        if(!product) {
            res.status(200).send({"error" : "ID does not exist"});
        //    return res.status(204).send("ID does not exist");
        }
        else {
            res.status(200).send(product);
        } 
    }
    catch(err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
}

// Update Product
const updateProduct = async(req, res) => {
    try {
        let id = req.params.productid;
        const {error} = schema.product_schema(req.body)
        if(error) {
            res.send({"error" : error.message});
            return;
        }
        const product = await Product.findOne({
            where : {
                id : id
            }
        })
        if(product == null)
        {
            return res.status(200).send({"error" : "Product does not even exist to delete"});
        }
        const updateProduct = await Product.update(req.body, {
            where: {id : id}
        });
        res.status(200).send({"message" : "Product updated successfully"});
    }
    catch(err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
}

// Delete product by id
const deleteProduct = async(req, res) => {
    try {
        let id = req.params.productid;
        const product = await Product.findOne({
            where : {
                id : id
            }
        })
        if(product == null)
        {
            res.status(200).send({"error" : "Product does not even exist to delete"});
        }
        else {
            await Product.destroy( {
                where : {id : id}
            });
            res.status(200).send({"message" : "Data successfully deleted"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send({ error: err });
    }  
}

// Published product
const getPublishedProduct = async(req, res) => {
    try {
        const products = await Product.findAll({where : {
            published : true
        }});
        if (products == null) 
        {
            res.status(200).send({"error" : "No products are published"});
        }
        else 
        {
            res.status(200).send(products);
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
}

module.exports = {
    addProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct
}