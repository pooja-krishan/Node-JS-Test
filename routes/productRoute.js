const productController = require('../controllers/productController');

const express = require('express');
const product_router = express.Router();

const user = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/products/add:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add products
 *     description: Add a product
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: title
 *         description: name of the product
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: price of the product
 *         in: formData
 *         required: true
 *         type: number
 *       - name: description
 *         description: description of the product
 *         in: formData
 *         required: false
 *         type: string
 *       - name: count
 *         description: count of the products available
 *         in: formData
 *         required: true
 *         type: number
 *       - name: published
 *         description: true if product has been published, else false
 *         in: formData
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: Successfully added product
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
product_router.post('/add',user.authenticateToken,productController.addProduct);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     tags:
 *       -  Products
 *     summary: get all products
 *     description: getsdetail of all products
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     responses:
 *       200:
 *         description: Product fetched Successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
product_router.get('/all',user.authenticateToken,productController.getProducts);

/**
 * @swagger
 * /api/products/getPublished:
 *   get:
 *     tags:
 *       -  Products
 *     summary: Get all products where published is true
 *     description: Gets detail of all products where published is true
 *     parameters:
 *       - name: published
 *         in: path
 *         description: contains a boolean value to specify if the product is published
 *         required: true
 *         type: boolean
 *     security:
 *       - appToken: []
 *     responses:
 *       200:
 *         description: Product fetched Successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */

product_router.get('/getPublished',user.authenticateToken,productController.getPublishedProduct);

/**
 * @swagger
 * /api/products/{productid}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get Product
 *     description: Fetches a single product based on ID
 *     parameters:
 *       - name: productid
 *         in: path
 *         description: productid
 *         required: true
 *         type: integer
 *     security:
 *       - appToken: []
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: API not found
 *       500:
 *         description: Internal server error
 */
product_router.get('/:productid',user.authenticateToken,productController.getOneProduct);

/**
 * @swagger
 * /api/products/{productid}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update products
 *     description: Update a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productid
 *         description: productid.
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: name of the product
 *         in: formData
 *         required: false
 *         type: string
 *       - name: price
 *         description: price of the product
 *         in: formData
 *         required: false
 *         type: number
 *       - name: description
 *         description: description of the product
 *         required: false
 *         in: formData
 *         type: string
 *       - name: published
 *         description: true if product has been published, else false
 *         required: false
 *         in: formData
 *         type: boolean
 *     security:
 *       - appToken: []
 *     responses:
 *       200:
 *         description: Successfully updated product
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
product_router.put('/:productid',user.authenticateToken,productController.updateProduct);

/**
 * @swagger
 * /api/products/{productid}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete products
 *     description: Delete a product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productid
 *         description: productid.
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - appToken: []
 *     responses:
 *       200:
 *         description: Successfully deleted product
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
product_router.delete('/:productid',user.authenticateToken,productController.deleteProduct);

module.exports = product_router;