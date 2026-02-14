const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = function( email ,id,role ) {

    return jwt.sign({email ,id ,role},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

}
exports.verifyToken = function(token) {
    try {
        const user =jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;    
    } catch (error) {
        return null;
    }
}