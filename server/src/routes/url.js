const {urlSchema} = require("../validators");
const express = require("express");
const urlrouter = express.Router();
const authMiddleware = require("../middleware/auth");
const {nanoid} = require("nanoid");
const Url = require("../models/Url");

urlrouter.post("/shorten",authMiddleware,async function (req,res){
    try{
         urlSchema.parse(req.body);
    }
    catch(err){
        return res.json({message : err});
    }

    const shortCode = nanoid(8);

    await Url.create({
        shortCode : shortCode,
        originalUrl : req.body.originalUrl,
        userId : req.user.id
    })

    return res.status(200).json({shortCode : shortCode});

})


urlrouter.get("/my-urls",authMiddleware,async function(req,res){
    const userId = req.user.id;
    const shortCodes = await Url.find({
        userId : userId
    })

    res.status(200).json({shortCodes});
})

module.exports = urlrouter;