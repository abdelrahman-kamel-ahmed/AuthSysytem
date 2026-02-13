const nodemailer = require('nodemailer');
require('dotenv').config();
//Create transporter
const transporter = nodemailer.createTransport({
    //provider: 'Gmail',
    host:process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

async function sendEmail(options) {
    try {
            await transporter.sendMail({from :process.env.MAIL_USER,...options});   
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
module.exports = {sendEmail };