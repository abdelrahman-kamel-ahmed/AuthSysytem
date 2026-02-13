//Import the validators
const { sendEmail } = require('../utils/mailService');
const { generateToken } = require('../utils/tokenService');
const authValidators = require('../Validations/authValidator');
//Import bcrypt for password hashing (if needed in future)
const bcrypt = require('bcrypt');

//fake database
const users = [];


//LOGIN FUNCTION
async function Login(req, res) {
    const{error , value} = authValidators.loginSchema.validate(req.body, { abortEarly: false }); 
    if(error){
        res.status(400).json({
            messages: "Validation Error",
            details: error.details.map(error => error.message)
        });
    }
    const email = value.email;
    const userExists = users.find(user => user.email === email);
    if(!userExists){
        return res.status(401).json({ message: "User does not exist" });
    }
    const passwordMatch = await bcrypt.compare(value.password, userExists.password);
    if(!passwordMatch){
        return res.status(400).json({ message: "Invalid credentials" });
    }
    await sendEmail({
        to: userExists.email,
        subject: "Login Notification",
        text: `Hello ${userExists.username}, you have successfully logged in!`
    });
    // Generate JWT token
    const token = generateToken(userExists.email, userExists.id, userExists.role);
    res.status(200).json({ message: "Login successful", data: {token, user:{email:userExists.email, role:userExists.role}}});
}
//REGISTER FUNCTION
//async to allow future use of await (e.g., for hashing)
async function Register(req, res) {
    const{error , value} = authValidators.registerSchema.validate(req.body, { abortEarly: false }); 
    if(error){
        res.status(400).json({
            messages: "Validation Error",
            details: error.details.map(error => error.message)
        });
    }
    const email = value.email;
    const hashedPassword= await bcrypt.hash(value.password, 12);
    const userExists = users.find(user => user.email === email);
    if(userExists){
        return res.status(409).json({ message: "User already exists" });
    }
    const newUser = {
        id: users.length + 1,
        username: value.username,
        email: value.email,
        password: hashedPassword,
        role: value.role,
        // avatar: req.file ? req.file.path : null, // Store avatar path if uploaded
        // docs: req.files ? req.files.map(file => file.path) : [] // Store docs paths if uploaded
        avatar: req.files?.avatar?.map(file => file.path) || [],
        docs: req.files?.docs?.map(file => file.path) || []
    };
    //another way to make new user
    //const newUser = { id: users.length + 1, ...value, password: hashedPassword };
    // console.log(req.files);
    console.log(req.files?.avatar?.map(file => file.path));
    console.log(req.files?.docs?.map(file => file.path));
    users.push(newUser);    
    res.status(201).json({ message: "User registered successfully", user: newUser });
}
function myProfile(req, res) {
    console(req.user.id);
}
function dashboard(req, res) {
    console(req.user.id);
}
function admin(req, res) {
    console.log(req.user.id,
        req.user.role
    );
}
module.exports = { Login, Register, myProfile , dashboard , admin };

/* 
    Another way to export 
    exports.Login = (req, res) => {
        res.send("Login Functionality");
    };
    exports.Register = (req, res) => {
        res.send("Register Functionality");
    };
*/