const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req, res) => {
    console.log(req.body);

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
                const maxAge = 3*24*60*60;
                console.log(results);
                db.query('SELECT * FROM USERS WHERE EMAIL=?',[email], async (err, result2, fields)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        const token = jwt.sign({user_id:result2[0].user_id, name:result2[0].name},
                            process.env.SECRET_KEY , { expiresIn:maxAge });
                        res.cookie('jwt', token, { httpOnly:true, maxAge:maxAge*1000 });
                        res.redirect('/user');
                    }
                })
            }
        })

    })

}