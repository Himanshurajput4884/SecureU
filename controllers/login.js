const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.login = (req, res) => {
    

    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM USERS WHERE EMAIL=?', [email], async (err, results, fields)=>{
        if(err){
            console.log(err);
        }       
        else if(results.length > 0)
        {
            const comparison = bcrypt.compare(password, results[0].password);
            if(comparison){
                console.log('Login Successfully.');
                return res.render('user', {
                    message: results[0].name
                });
            }
            else{
                res.render('login', {
                    message: 'Incorrect Email and Password.'
                });
            }
        }
        else{
            res.render('login', {
                message: "Email doesn't Exists."
            });
        }
    })
    
}