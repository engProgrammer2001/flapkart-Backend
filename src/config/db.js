const mongoose = require("mongoose")


const mongoUrl = "mongodb://127.0.0.1:27017/mobileshop"


// const connectDb=()=>{
//     return mongoose.connect(mongoUrl);
// }

const connectDb = () =>{
    mongoose.connect(mongoUrl);
}

const db = mongoose.connection;

module.exports={connectDb}
