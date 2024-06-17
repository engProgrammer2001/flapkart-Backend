const app = require(".");

const db = require("./config/db.js")
const { connectDb } = require("./config/db");
require ("dotenv").config();

const PORT = process.env.LOCAL_PORT;


app.listen(PORT, async () => {
  await connectDb();
  console.log("e-commerce Api listing on PORT : ", PORT);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");
});
