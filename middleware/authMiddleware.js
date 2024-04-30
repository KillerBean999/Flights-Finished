const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateToken = (req,res,next) =>{
    const authHeaders = req.headers['Authorization']
    const token = authHeaders && authHeaders.split(' ')[1]

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, env.process.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) {
            return res.sendStatus(403);
        }        
    })
    req.user = user;
    next()
}

module.exports = { authenticateToken };
