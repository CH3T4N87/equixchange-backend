const Usermodel = require("../models/UserModel.js");
const {createSecretToken} = require("../util/SecretToken.js");
const bcrypt = require("bcryptjs");

module.exports.Signup= async(req, res) => {
    try {
      const { email, password, username, createdAt } = req.body;
      const existingUser = await Usermodel.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await Usermodel.create({ email, password, username, createdAt });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,  
        secure: true,  
        sameSite: "None"
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


 module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect password or email" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).json({ message: "Incorrect password or email" });
        }

        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,   // ✅ Prevents XSS
            secure: true,     // ✅ Required for HTTPS
            sameSite: "None", // ✅ Allows cross-site cookies
        });

        return res.status(200).json({ message: "User logged in successfully", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
