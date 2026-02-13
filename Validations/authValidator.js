const Joy = require('joi');
//LOGIN VALIDATION SCHEMA
const loginSchema = Joy.object({
    email: Joy.string().email().required(),
    password: Joy.string().min(6).required()
});
//REGISTER VALIDATION SCHEMA
const registerSchema = Joy.object({
    username: Joy.string().alphanum().required(),
    email: Joy.string().email().required(),
    password: Joy.string().min(6).required(),
    role: Joy.string().valid('seller', 'admin', 'buyer').default('buyer')
});
//export validation functions
module.exports = { loginSchema, registerSchema };