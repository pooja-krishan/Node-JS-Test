const userController = require('../controllers/userController');

const express = require('express');
const user_router = express.Router();

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     tags:
 *       - User
 *     summary: Post user details
 *     description: Registers a single user
 *     parameters:
 *       - name: first_name
 *         in: formData
 *         description: first_name
 *         required: true
 *         type: string
 *       - name: last_name
 *         in: formData
 *         description: last_name
 *         required: true
 *         type: string
 *       - name: phone_number
 *         in: formData
 *         description: phone_number
 *         required: true
 *         type: string
 *       - name: address
 *         in: formData
 *         description: address
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         description: email
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: password
 *         required: true
 *         type: string
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
 user_router.post('/add',userController.addUser);

 /**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Post jwt token for user login
 *     description: Enables a single user to login
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: email
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: password
 *         required: true
 *         type: string
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
  user_router.post('/login',userController.authenticate);

 module.exports = user_router;