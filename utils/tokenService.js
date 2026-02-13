const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = function( email ,id ,role ) {

    return jwt.sign({email ,id ,role},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

}
exports.verifyToken = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);    
    } catch (error) {
        return null;
    }
}