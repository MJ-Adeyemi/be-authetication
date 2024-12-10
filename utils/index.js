const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Token = async (req, res) => {
  try {
    await jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send(201, Token);
  } catch (error) {
    console.log(`server error ${error}`);
  }
};

module.exports = Token;
