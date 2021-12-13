const jwt = require('jsonwebtoken');
const authconfig= require("../config/auth.json");

module.exports = (req,res, next)=>{
    const authHeader = req.headers.authorization;   

    if(!authHeader)
        return res.status(401).send({error: 'No token provided'});
    
    const [, token] = authHeader.split(' ');

    //if(!parts.length ==2)
        //return res.status(401).send({error: 'Token error'});


    jwt.verify(token, authconfig.secret,(err, decoded)=>{
        if(err)return res.status(401).send({error: 'Token invalid'});

        req.userId =decoded.id;
        return next();
    })
};