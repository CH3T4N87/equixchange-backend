const mongoose = require("mongoose");
const Userschema = require("../schemas/UsersSchema");

const UserModel = mongoose.model("User",Userschema);

module.exports = UserModel;


