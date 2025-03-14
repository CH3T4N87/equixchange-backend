const mongoose = require("mongoose");
const {PositionsSchema} = require("../schemas/PositionsSchema");


const PositionsModel = new mongoose.model("position",PositionsSchema);

module.exports = PositionsModel;