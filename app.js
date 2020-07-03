const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || process.env.DEVELOPMENT ? 3000 : 80;

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var corsOptions = {
//   origin: 'http://kevgarcia.me',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())




// ROUTES
app.use('/sendtome', require('./routes/sendToMe'))




app.get("/", (req, res) => {
  res.send("Welcome the email api")
})

app.get("/checkcred", (req, res) => {

  let checkCred = {
    email: false,
    pass: false
  }

  checkCred.email = process.env.EMAIL ? true : false
  checkCred.pass = process.env.PASS ? true : false

  res.json(checkCred)
})



app.listen(port, () => {
  console.log(`We're up and running on ${ port }`);
})

