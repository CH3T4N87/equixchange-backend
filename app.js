require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const HoldingsModel = require("./models/HoldingsModel");
const PositionsModel = require("./models/PositionsModel");
const OrdersModel = require("./models/OrdersModel");
const Usermodel = require("./models/UserModel");

const {createSecretToken} = require("./util/SecretToken");
const UserModel = require("./models/UserModel");

const userRoute = require("./routes/UserRoutes.js");



const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log('Connected to DataBase !'))
  .catch(() => console.log("Failed to connect with DataBase !"));

  

  app.use(cors({ origin:['https://equixchange.vercel.app','https://dashboard-equixchange.vercel.app'], credentials: true }));

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  


  app.use("/",userRoute);

app.get("/allHoldings",async(req,res) => {
  let allHoldings = await HoldingsModel.find();
  res.json(allHoldings);
})

app.get("/allPositions",async(req,res) => {
  let allPositions = await PositionsModel.find();
  res.json(allPositions);
});
app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
    userId : req.body.userId,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.get("/orders/:id", async(req, res) => {
  let Id = req.params.id;
  // console.log(Id);
  let allOrders = await OrdersModel.find({userId :Id});
  res.json(allOrders);
})

app.get("/:id" , async(req,res)=>{
  const id = req.params.id;
  let user = await UserModel.find({_id: id});
  // console.log(user[0].username);
  res.json(user);
});


app.listen(PORT, () => {
  console.log("Server is running on port 3002 !");
})
