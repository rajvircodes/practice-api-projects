const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const protected  = async (req, res, next)=>{
    try {
        let token;

        // extract token from Authorization header

        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            res.status(401).json({
                message:"Not authorized, token missing"
            });
        }

        // verify toke 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // find user from database 

        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        // attach user to request
        req.user = user
        next()



    } catch (error) {
        res.status(401).json({
            message:"Not authorized, invalid token"
        })
    }
}