const express = require('express');
const sendToMeRouter = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// console.log("from sent to me");


// Transport config
let transport = {
  host: 'smtp.gmail.com',
  port: 465, //465 is true
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
}

// re-usable transporter object
let smtpTransporter = nodemailer.createTransport(transport)



// the posting route
sendToMeRouter.post('/', (req, res, next) => {
  let data = req.body;
  console.log(data.name);
  
  let mail = {
    from: `${ data.email }`, // this doesnt appear anywhere TODO change that later to knew adress
    to: 'kevwebsite@gmail.com',
    subject: `!!website from ${ data.name }`,
    html: `<p>${data.name}</p>
            <p>${data.email}</p>
            <p>${data.message}</p>`
  }

  smtpTransporter.sendMail(mail, (error, response)=>{
    if (error) {
      res.send(error)
    } else {
      res.send('success')
    }
    smtpTransporter.close();
  })
})


module.exports = sendToMeRouter