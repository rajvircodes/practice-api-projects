// Utility to generate JWT token 
const jwt = require('jsonwebtoken');

const generateToke = (userId) =>{
    

    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES_IN
        }
    );
};

module.exports = generateToke;