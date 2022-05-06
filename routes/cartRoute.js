const cartController = require('../controllers/cartController');

const express = require('express');
const cart_router = express.Router();

const user = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/cart/addToCart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add to cart
 *     description: Add user and product to cart
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: productId
 *         description: ID of the product
 *         in: formData
 *         required: true
 *         type: number
 *       - name: userId
 *         description: ID of the user
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully added to cart
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
 cart_router.post('/addToCart',user.authenticateToken,cartController.addToCart);

 /**
 * @swagger
 * /api/cart/viewCart/{userId}:
 *   get:
 *     tags:
 *       - Cart
 *     summary: View cart
 *     description: Get all items in cart
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: userId
 *         description: ID of user
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully displayed cart
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
  cart_router.get('/viewCart/:userId',user.authenticateToken,cartController.viewCart);

  /**
 * @swagger
 * /api/cart/deleteFromCart/{productId}/{userId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete from cart
 *     description: delete a product from cart
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: productId
 *         description: ID of the product to be deleted
 *         in: path
 *         required: true
 *         type: number
 *       - name: userId
 *         description: ID of the user
 *         in: path
 *         required: true
 *         type: number
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
   cart_router.delete('/deleteFromCart/:productId/:userId',user.authenticateToken,cartController.deleteFromCart);

  /**
 * @swagger
 * /api/cart/addQty/{productId}/{userId}:
 *   put:
 *     tags:
 *       - Cart
 *     summary: Increase product count in cart
 *     description: Increase the number of products added
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: productId
 *         description: ID of the product to add
 *         in: path
 *         required: true
 *         type: number
 *       - name: userId
 *         description: ID of the user
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully increased product count
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
   cart_router.put('/addQty/:productId/:userId',user.authenticateToken,cartController.addQty);

/**
 * @swagger
 * /api/cart/delQty/{productId}/{userId}:
 *   put:
 *     tags:
 *       - Cart
 *     summary: Decrease product count in cart
 *     description: Decrease the number of products added
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
 *     parameters:
 *       - name: productId
 *         description: ID of the product to delete
 *         in: path
 *         required: true
 *         type: number
 *       - name: userId
 *         description: ID of the user
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully decreased product count
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
      cart_router.put('/delQty/:productId/:userId',user.authenticateToken,cartController.delQty);


 module.exports = cart_router;