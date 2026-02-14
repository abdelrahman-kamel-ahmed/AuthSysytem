const Joy = require('joi');
const { sysystemRoles } = require('../utils/roleService');
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
    role: Joy.string().valid(sysystemRoles.SELLER, sysystemRoles.BUYER, sysystemRoles.SuperAdmin, sysystemRoles.ADMIN).default(sysystemRoles.BUYER)
});
//export validation functions
module.exports = { loginSchema, registerSchema };