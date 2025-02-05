const mongoose = require("mongoose");
const {OrdersSchema} = require("../schemas/OrdersSchema");


const OrdersModel = new mongoose.model("order",OrdersSchema);

module.exports = OrdersModel;