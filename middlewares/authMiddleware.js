const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)
        return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if(err){
            res.sendStatus(403);
            return;
        }
        else if(user) {
            res.status(200).send({"message" : "Access granted. Logged in"});
            console.log(user);
            next();
        }
    })
}

module.exports = {
    authenticateToken
}