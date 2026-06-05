const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {signupSchema} = require("../validators");

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

module.exports = router;