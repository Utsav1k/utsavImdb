const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token ){
        return res.status(401).send('Access denied. No token provided');
    }
    try{
        const decoded = jwt.verify(token , process.env.jwt||'duns');
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}