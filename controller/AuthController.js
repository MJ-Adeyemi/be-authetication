const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const TokenVerify = require("../utils/index");
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
    res.send(200, "user registered successfully");
  } catch (error) {
    console.log(error, "failed to register");
    res.send(500, "server error");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validate = await User.findOne({ email });
    if (!validate) return res.send(401, "Invalid Email and Password");

    const MatchPassword = await bcrypt.compare(password, validate.password);
    if (!MatchPassword) return res.send(401, "invalid password");

    const token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // let token = TokenVerify();

    res.send(200, `login successfully ${token}`);
  } catch (error) {
    console.log(error, "server error");
    res.send(500, "server error");
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { RegisterUser, Login, getProfile };
