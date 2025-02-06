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

// const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(() => console.log('Connected to DataBase !'))
  .catch(() => console.log("Failed to connect with DataBase !"));

  

  // app.use(cors({
  //   origin: 'http://localhost:3000', 
  //   credentials: true,               
  // }));
  app.use(cors({ origin:['http://localhost:3000','https://equixchange-backend.onrender.com'], credentials: true }));

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  
  // app.use("/", authRoute);

  app.use("/",userRoute);
// app.get("/fort", async (req, res) => {
//    let positions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   positions.forEach((holding) => {
//     let newHolding = new PositionsModel({
//       product: holding.product,
//       name: holding.name,
//       qty: holding.qty,
//       avg: holding.avg,
//       price: holding.price,
//       net: holding.net,
//       day: holding.day,
//       isLoss: holding.isLoss,
//     });
     
//      newHolding.save();
 
//   })
//   res.send("Data inserted successfully !");

// })

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

//Setting up Authentication







app.listen(PORT, () => {
  console.log("Server is running on port 3002 !");
})
