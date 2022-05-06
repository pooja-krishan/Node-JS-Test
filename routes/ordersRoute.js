const ordersController = require('../controllers/ordersController');

const express = require('express');
const orders_router = express.Router();

const user = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/orders/addOrders/{userId}:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Place order
 *     description: Place an order for the items in the cart
 *     parameters:
 *       - name: userId
 *         description: ID of the user who is placing the order
 *         in: path
 *         required: true
 *         type: number
 *     produces:
 *       - application/json
 *     security:
 *       - appToken: []
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
 orders_router.post('/addOrders/:userId',user.authenticateToken,ordersController.addOrders);

 module.exports = orders_router;