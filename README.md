# NodeJs User Authentication
A simple Full Stack Project to Implement Login and Register Using NodeJs, Express.Js, Bcrypt.Js, JWT and MySQL Database.
1. This Project Allows user to Register and Login.
2. When the User is Logged in some cookie is passed using JWT so that he dont have to login everytime he visit the website.
3. There are some Protecting routes which prevent user to access without Register/Login.
4. Handlebars  is used as a Templating Language.
5. Logged In User can see registered name on every page.
6. Logged In User can get direct access to their account until he log-out from the website.



# Dependencies : 
1. "bcryptjs": "^2.4.3",
2. "cookie-parser": "^1.4.6",
3. "dotenv": "^16.0.0",
4. "express": "^4.17.3",
5. "hbs": "^4.2.0",
6. "jsonwebtoken": "^8.5.1",
7. "mysql": "^2.18.1"

# Install
Make sure you have Nodejs & xampp installed start mysql & apache on the xampp server.
Database is at localhost port : 3306


# Create table
Now go to phpmyadmin and create a new database table called users with the following 4 columns

1. User_Id
2. name
3. Email
4. Password


# Start

run npm start your app should be running on http://localhost:3000/

# Demo
https://user-images.githubusercontent.com/92199465/157396488-efcd3076-609b-4669-b38d-bffd39b50b38.mp4
