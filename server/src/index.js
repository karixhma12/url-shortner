const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message : "Server is running!"});
})





app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
})