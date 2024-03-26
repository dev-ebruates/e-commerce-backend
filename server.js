const express = require("express");
const mongoose = require("mongoose");
const dontenv =  require("dotenv");
const cors = require("cors");
const mainRoute = require("./routes/index.js");
const logger = require("morgan")
const port = 5555;
const app = express();

dontenv.config();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mondoDb")
  } catch (error) {
    throw error;
  }
}

//middlewares gelen dataları node fa görmek için 
app.use(logger("dev"));
app.use(express.json());
app.use(cors());


app.use("/api", mainRoute);

app.listen(port,()=>{
  connect();
  console.log(`sunucu ${port} portunda çalışıyor`);
})