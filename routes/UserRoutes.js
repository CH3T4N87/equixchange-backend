const express = require("express");
const router = express.Router();
const UserController = require("../controllers/Users.js");

router.route("/signup")
.post(UserController.Signup);

router.route("/login")
.post(UserController.Login);

module.exports = router;