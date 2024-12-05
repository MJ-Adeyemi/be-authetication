const express = require("express");
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const router = require("./routes/user")
dotenv.config();
const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(bodyParser.json());
app.use('/api', router)

app.listen(PORT, () =>{
    console.log("server running ")
})