const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {signupSchema} = require("../validators");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/signup",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    //step 1 : validate the input with zod 
    try{
        signupSchema.parse(req.body);
    }
    catch(err){
        return res.status(401).json({message : "invalid credentials!"});
    }

    //step 2 : check if a user with that email already exists 
    const user = await User.findOne({
        email : email
    })

    if(!user){
        //step 3 : hash the password with bcrypt 
        const hashedPassword = await bcrypt.hash(password,10);

        //step 4 : save the new user to the database 
        await User.create({
            email : email,
            password : hashedPassword
        })
        //step 5 : return a success response 
        res.status(200).json({message : "Successfully signed up!"});
    
    }
    else{
        return res.status(401).json({message : "A user account with that email-id already exists!"});
    }
})


router.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    //step 1 : validate input with zod 
    try{
        signupSchema.parse(req.body)
    }
    catch(err){
        return res.status(401).json({message : err});
    }

    //step 2: find user by email, if not found - return an error 
    const user = await User.findOne({
        email : email
    })

    if(!user){
        return res.status(401).json({message : "No such user found!"});
    }

    //step 3 : compare passwords 
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return res.status(401).json({message : "Incorrect password"});
    }

    //step 4 : generate jwt and send it back 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.status(200).json({message : "successfully signed in!", token : token})


})

module.exports = router;