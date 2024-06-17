const mongoose = require("mongoose")


// const mongoUrl = "mongodb://127.0.0.1:27017/mobileshop"
const mongoUrl = "mongodb+srv://askushwaha613:Ashok8103334932@cluster0.ur6sszo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// const connectDb=()=>{
//     return mongoose.connect(mongoUrl);
// }

const connectDb = () =>{
    mongoose.connect(mongoUrl);
}

const db = mongoose.connection;

module.exports={connectDb}
