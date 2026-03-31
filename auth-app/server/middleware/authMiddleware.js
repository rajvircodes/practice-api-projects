const jwt = require('jsonwebtoken')

const protect = (req, res, next) =>{
    try {
        // 1. Get token from request headers



        // 2. Extract token



        // 3. Verify token 




        // 4. Attach user id to request object
    } catch (error) {
        res.status(401).json({ message: 'Invalid token, access denied!' })
    }
}