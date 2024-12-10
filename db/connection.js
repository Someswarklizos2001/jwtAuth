const mongoose = require("mongoose");
const dotenv=require('dotenv');

dotenv.config();

function connection() {
   
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.1gtwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then((res) => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports=connection;
 