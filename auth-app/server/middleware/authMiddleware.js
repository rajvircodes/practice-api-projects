const jwt = require('jsonwebtoken')

const protect = (req, res, next) =>{
    try {
        // 1. Get token from request headers
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message:"No token, access denied!"})
        }
        // 2. Extract token
        const token = authHeader.split(' ')[1]
        // 3. Verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // 4. Attach user id to request object
       req.userId = decoded.id 
        next()


    } catch (error) {
        res.status(401).json({ message: 'Invalid token, access denied!' })
    }
}

module.exports = protect