const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
dotenv.config({ path: './.env'});
const mysql = require('mysql');




const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;    
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.redirect("/login");
            }
            else{
                next();
            }
        });
    }   
    else{
        res.redirect('/login');
    }
}




const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
    
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){      
                res.locals.user = null;
                next();
            }
            else{
                let user = decoded.name;
                res.locals.user = user;
                next(); 
            }
        })
    }
    else{
        res.locals.user = null;  
        next();
    }
}



module.exports = { requireAuth, checkUser };