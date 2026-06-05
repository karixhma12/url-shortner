const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./db");
const User = require("./models/User");
const Url = require("./models/Url");
const router = require("./routes/auth");
const urlrouter = require("./routes/url");

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
app.use("/api/auth",router);
app.use("/api/url",urlrouter);

app.get("/",(req,res)=>{
    res.json({message : "Server is running!"});
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000!");
})