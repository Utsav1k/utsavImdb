const express = require('express')
const app=express();
const cors = require('cors');
const Cookies = require('cookie-parser');

const userLogin =require('./Routes/login');
const userRegister =require('./Routes/register');
const api =require('./Routes/api.js');
const path = require('path');
const port = process.env.PORT || 3001;
require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(Cookies());
app.use((req,res,next) =>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
})

var mongoose =require('mongoose');
var mongoDB=process.env.MONGODB_URI||'mongodb://localhost:27017/db';
mongoose.connect(mongoDB);
mongoose.set('useFindAndModify', false);
mongoose.Promise=global.Promise;
var db =mongoose.connection;
db.on('connected',function(){
	// console.log('connection done');
});
db.on('error',function(err){
	// console.log('error');
});

// const OrientDBClient = require("orientjs").OrientDBClient;

// OrientDBClient.connect({
//   host: "localhost",
//   port: 2424
// }).then(client => {
// 	client.session({ name: "demodb", username: "admin", password: "admin" })
// }).then(client => {
//   return client.close();
// }).then(()=> {
//    // console.log("Client closed");
// });
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'utsav.khandelwal97@gmail.com',
//     pass: 'ndus1104'
//   }
// });

// var mailOptions = {
//   from: 'utsav.khandelwal97@gmail.com',
//   to: 'utsav.khandelwal04@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     // console.log(error);
//   } else {
//     // console.log('Email sent: ' + info.response);
//   }
// });
app.use('/login',userLogin);
app.use('/register',userRegister);
app.use('/api',api);
// let reqPath = path.join(__dirname, '../');//It goes three folders or directories back from given __dirname.
// // console.log(reqPath)
app.use(express.static(path.join(__dirname, "newApp", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "newApp", "build", "index.html"));
});

app.listen(port,()=>{
    // console.log("started");
});
