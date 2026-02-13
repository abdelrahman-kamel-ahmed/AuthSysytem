//REQ
const { rateLimit } = require('express-rate-limit');
const express = require('express');
const dotenv = require('dotenv');
const cors= require('cors');  //cross origin resource sharing
//Config
dotenv.config();
const PORT = process.env.PORT || 5000;
// this line means each IP can make 100 requests in 15 minutes, if they exceed that, they will get a message "Too many requests from this IP, please try again after 15 minutes"
const limiter = rateLimit({limit: 100, windowMs: 1000*60*15, message: "Too many requests from this IP, please try again after 15 minutes"});
//Create Server
const app = express();
//Middlewares
app.use(express.json());
//this line allow the browser (client) to access the server and send requests
//the cores libirary is used to allow clients to hit my srver
app.use(cors({ origin: process.env.CLIENT_URL }));
//Rate Limiter Middleware
app.use(limiter);
//Routes
app.use("/api/auth", require("./Routes/authRoutes"));
//Run Server
app.listen(PORT, () => {
    console.log(`Server running @ port : ${PORT}`);
});