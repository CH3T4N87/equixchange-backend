const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
    instrument : String,
    qty : Number,
    avgCost : Number,
    totalCost : Number,
});

module.exports = { HoldingsSchema };