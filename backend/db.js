const mongoose = require("mongoose");


module.exports = () =>{
    const DB = "mongodb://localhost:27017/glacier";

    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(DB,connectionParams);
        console.log("Connected to database Successfully");
    } catch (error) {
        console.log("in catch db.js",error);
    }
}