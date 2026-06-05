const mongoose = require("mongoose");


async function connectToDatabase(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database successfully connected!");
    })
    .catch((err)=>{
        console.log("There has been an error : " + err);
    })
}

module.exports = connectToDatabase;