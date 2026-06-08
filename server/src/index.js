const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./db");
const User = require("./models/User");
const Url = require("./models/Url");
const router = require("./routes/auth");
const urlrouter = require("./routes/url");
const cors = require("cors");

dotenv.config();
connectToDatabase();
const app = express();

app.use(cors({
    origin : process.env.CLIENT_URL
}));

app.use(express.json());
app.use("/api/auth",router);
app.use("/api/url",urlrouter);

app.get("/:shortCode",async function(req,res){
    const shortCode = req.params.shortCode ; 
    const url = await Url.findOne({
        shortCode : shortCode 
    })

    if(!url){
        return res.status(404).json({message: "URL not found!"});
    }

    const URL = url.originalUrl; 

    return res.redirect(URL);
})

app.get("/",(req,res)=>{
    res.json({message : "Server is running!"});
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
})