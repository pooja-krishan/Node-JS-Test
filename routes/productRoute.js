const productController = require('../controllers/productController');

const express = require('express');
const router = express.Router();

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
router.post('/add',productController.addProduct);

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
router.get('/all',productController.getProducts);

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

router.get('/getPublished',productController.getPublishedProduct);

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
router.get('/:productid',productController.getOneProduct);

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
router.put('/:productid',productController.updateProduct);

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
router.delete('/:productid',productController.deleteProduct);

module.exports = router;