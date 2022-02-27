const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const cpass = req.body.cpassword;


    db.query('SELECT EMAIL FROM users WHERE EMAIL = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: "That Email is already taken."
            });
        }
        else if (password !== cpass) {
            return res.render('register', {
                message: "Passwords are different."
            })
        }

        
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword); 
        
        db.query('INSERT INTO USERS SET ?', { name:name, email:email, password:hashedPassword}, (err, results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Register Successfully.');
                return res.render('login')
            }
        })

    })

    
}