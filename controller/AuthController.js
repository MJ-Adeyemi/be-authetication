const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config();

const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.send("email already exist ");

    const HashPassword = await bcrypt.hash(password, 10);
    const NewUser = new User({
      username,
      email,
      password: HashPassword,
    });

    await NewUser.save();
    res.send(200, "user registered successfully")
  } catch (error) {
    console.log(error, "failed to register")
    res.send(500, "server error")
  }
};

const Login = async(req, res) => {
   try {
     const { email, password } = req.body;

     const validate = await User.findOne({ email });
     if (!validate) return res.send(401, "Invalid Email and Password");

     const MatchPassword = await bcrypt.compare(password, validate.password);
     if (!MatchPassword) return res.send(401, "invalid password");

     res.send(200, "login successfully");
   } catch (error) {
    console.log(error, "server error")
    res.send(500, "server error")
   }

}




module.exports = {RegisterUser, Login}