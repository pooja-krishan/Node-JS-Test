const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    console.log(req.headers);
    const token = req.headers.apptoken;
    console.log(token);
    if(!token)
        return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if(err){
            res.sendStatus(403);
            return;
        }
        else if(user) {
            // res.status(200).send({"message" : "Access granted. Logged in"});
            console.log("Logged in");
            console.log(user);
            next();
        }
    })
}

module.exports = {
    authenticateToken
}