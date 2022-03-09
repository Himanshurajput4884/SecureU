const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});




exports.logout = (req, res)=>{    
    res.cookie('jwt', '', { maxAge:1 });
    res.redirect('/');    
}


exports.login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    
    const maxAge = 3*24*60*60;       // here is seconds.
    db.query('SELECT * FROM USERS WHERE EMAIL=?', [email], async (err, results, fields)=>{
        if(err){
            console.log(err);
        }       
        else if(results.length > 0)
        {
            const comparison = await bcrypt.compare(password, results[0].password); 
            if(comparison){
                
                    const token = jwt.sign({user_id:results[0].user_id, name:results[0].name},
                        process.env.SECRET_KEY , { expiresIn:maxAge });
                res.cookie('jwt', token, { httpOnly:true, maxAge:maxAge*1000 });
                res.redirect('/user');
            }
            else{
                res.redirect('/login');
            }
        }
        else{
            res.redirect('/login');
        }
    })
    
}


