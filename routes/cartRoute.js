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
 *         description: ID of the user
 *         in: path
 *         required: true
 *         type: number
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
  cart_router.get('/viewCart/:userId',user.authenticateToken,cartController.viewCart);

 module.exports = cart_router;