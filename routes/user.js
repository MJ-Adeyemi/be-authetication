const express = require("express")
const {
  RegisterUser,
  Login,
  getProfile,
} = require("../controller/AuthController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post('/register', RegisterUser)
router.post("/login", Login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router