const express = require("express");
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/user")
dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT;




// let corsOptions = {
//   origin: ["http://localhost:5500"]
// };

// app.use(cors(corsOptions));
connectDB();
app.use(bodyParser.json());
app.use('/api', router)

app.listen(PORT, () =>{
    console.log("server running")
})