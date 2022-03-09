const express = require('express');
const router = express.Router();
const authController = require('../controllers/login');
const cookieParser = require('cookie-parser');     

const { requireAuth, checkUser } = require('../middleware/authmiddleware');





router.get('*', checkUser);



router.get('/',(req, res) => res.render('index.hbs'));

router.get('/hidden', requireAuth, (req, res) => res.render('hidden.hbs'));

router.get("/register", (req, res) =>{
    res.render("register.hbs");
});

router.get('/login', (req, res)=>{
    res.render('login.hbs');
})

router.get('/user', (req, res)=>{
    res.render('user.hbs');
})


router.get('/logout', authController.logout);



module.exports = router;       