const { sequelize } = require('../model');
const db = require('../model');
const schema = require('../middlewares/validationMiddleware');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = db.users;

// Add product

const addUser = async(req, res) => {
    const {error} = schema.user_schema(req.body)
    // res.send(validation);
    if(error) {
        res.send({"error" : error.message});
        return;
    }
    let info = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
    }
    // const {result} = schema.validate(info)
    const user = await User.create(info).then(() => {
        res.status(200).send({"message":"User added successfully"});
    })
    .catch((err) => {
        res.send({"message ": "Duplicate entry :" + err.errors[0].message});
    });
}

const authenticate = async(req,res) => {
    const {error} = schema.user_schema_email(req.body);
    if(error) {
        res.send({"error" : error.message});
        return;
    }
    const email = req.body.email;
    const user = await User.findOne({
        where : {   email : email   }
    });
    if(user === null) {
        res.status(200).send({"error" : "User does not exist. Register user"});
    }
    else {
        const accessToken = jwt.sign(email,process.env.ACCESS_TOKEN_SECRET);
        res.send({accessToken : accessToken});
    }
}
module.exports = {
    addUser,
    authenticate
}