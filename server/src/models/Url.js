const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortCode : {type:String, required: true, unique:true},
    originalUrl : {type:String, required: true},
    uerId : {type: mongoose.Schema.Types.ObjectId , ref:"User"}
})

const Url = mongoose.model("Url",urlSchema);

module.exports = Url;