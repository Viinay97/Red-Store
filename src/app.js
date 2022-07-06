const express = require('express');
const path = require('path');
const app = express();
const hbs = require("hbs");


require("./db/conn");
const Register = require("./models/registers");

const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.use('/images',express.static('images'));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/products",(req,res)=>{
    res.render("products");
})

app.get("/cart",(req,res)=>{
    res.render("cart");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/index",(req,res)=>{
    res.render("index");
})

app.get("/details",(req,res)=>{
    res.render("details");
})

app.get("/about",(req,res)=>{
    res.render("about");
})


//Create a new user in our database
app.post("/register", async (req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if(password === cpassword){
            const registerEmployee = new Register({
                username : req.body.username,
                email : req.body.email,
                password : password,
                confirmPassword : cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("login");
        }
        else{
            //I want to display the message "Passwords not matching" in an alert.
            res.send("Passwords are not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

//Login Check 
app.post('/login', async (req, res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        //finding if the user exists in the database
        const uname =  await Register.findOne({username: username});
        /*getting his password from the database nd checking if it is equal to 
        the entered one*/
        if(uname != null && uname.password === password){
            //If the password is correct, send the user to the homepage
            res.status(201).render("index");
        }
        else{
            res.send("Invalid username or password.")
        }

    }catch(error){
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})