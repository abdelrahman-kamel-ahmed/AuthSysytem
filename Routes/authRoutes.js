const express = require('express');
const router = express.Router();
const uploader = require('../utils/uploadserrvice').uploader;
//Import Controller
const authController = require('../Controllers/authController');
const { authMiddleware } = require('../MiddleWares/authMiddleWare');
const { adminMiddleware } = require('../MiddleWares/adminMiddleWare');
//LOGIN ROUTE
router.post('/login', authController.Login);
//REGISTER ROUTE
//this is a middleware to handle avatar upload, it will be used in the controller to access the file path
// router.post('/register', uploader.single('avatar'),authController.Register);
//this is a middleware to handle multiple docs upload, it will be used in the controller to access the file paths
// router.post('/register', uploader.array('docs',3),authController.Register);
//this is a middleware to handle both avatar and docs upload, it will be used in the controller to access the file paths
router.post('/register', uploader.fields([{ name: 'avatar', maxCount: 1 }, { name: 'docs', maxCount: 3 }]), authController.Register);
//MYPROFILE ROUTE
router.get('/myProfile', authMiddleware,authController.myProfile);
router.get('/dashboard', authMiddleware,authController.dashboard);
router.get('/admin', adminMiddleware,authController.admin);
//EXPORT ROUTER TO USE IN SERVER.JS
module.exports = router;