const mongoose = require("mongoose")
require("dotenv").config()

const LOCAL_HOST_DB_URL = process.env.LOCAL_HOST_DB_URL;
// const SERVER_HOST_DB_URL = process.env.SERVER_HOST_DB_URL;

//const mongoUrl= SERVER_HOST_DB_URL;
const mongoUrl = LOCAL_HOST_DB_URL;


// const connectDb=()=>{
//     return mongoose.connect(mongoUrl);
// }


const connectDb = () =>{
    mongoose.connect(mongoUrl);
}

const db = mongoose.connection;

module.exports={connectDb}
