const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())


app.get("/", (req, res) => {
  res.send("Welcome the email api")
})


app.post('/api/test', (req, res) => {
  let data = req.body;
  console.log(req.body.message); //request IS coming in

  let transport = {
    // service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  }

  let smtpTransporter = nodemailer.createTransport(transport)

  let mail = {
    from: data.email,
    to: 'kev4tech@gmail.com',
    subject: `!!website from ${ data.name }`,
    text: data.message,
    htnl: `<p>${data.name}</p>
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




app.listen(port, () => {
  console.log("We're up and running on 8080");
})

