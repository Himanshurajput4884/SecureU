const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});            


const app = express();   


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,                          
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,           
    database: process.env.DATABASE
});                     


app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');  
const imgDirectory = path.join(__dirname, './img')

app.use(express.urlencoded({ extended:true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(imgDirectory));
app.use(express.static(publicDirectory));    


db.connect( (err)=>{                   
    if(err){
        console.log(err);
    }
    else{
        console.log("Database is connected...");
    }
} );



//  DEFINE ROUTES
app.use("/", require('./routes/pages'));
app.use("/hidden", require('./routes/pages'));
app.use("/auth", require('./routes/auth'));
app.use('/logout', require('./routes/pages'));
app.use("/LoginAuth", require('./routes/LoginAuth'));


app.listen(3000, ()=>{
    console.log("Port is at server : 3000");
});