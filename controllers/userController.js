const { sequelize } = require('../model');
const db = require('../model');
const schema = require('../middlewares/validationMiddleware');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = db.users;

// Add product

const addUser = async(req, res) => {
    const {error} = schema.user_schema(req.body)
    // res.send(validation);
    if(error) {
        res.send({"error" : error.message});
        return;
    }
    const saltRounds = 10;
    let password = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password,salt);
    let info = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : passwordHash
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
    const {error} = schema.user_schema_login(req.body);
    if(error) {
        res.send({"error" : error.message});
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        where : {   email : email   }
    });
    if(user === null) {
        return res.status(200).send({"error" : "User does not exist. Register user"});
    }
    const verify = await bcrypt.compareSync(password,user.password);
    if(!verify){
        return res.status(200).send({"error" : "Incorrect password"}); 
    } 
    const accessToken = jwt.sign(email,process.env.ACCESS_TOKEN_SECRET);
    res.send({accessToken : accessToken});
}
module.exports = {
    addUser,
    authenticate
}