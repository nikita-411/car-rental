const express = require("express");
const Car = require("./models/Car");
const User = require("./models/User");
const RentedCarInfo = require("./models/RentedCarInfo");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const controllers = require("./controllers");
//const restrictedPages = require("./config/auth");
const app = require("express")();
//require("./config/express")(app);
//require("./config/routes");
//require("./config/passport")();
require("dotenv/config");


mongoose.connect(process.env.URL, function(err) {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", url);
});

db.on("error", err => {
  console.error("connection error:", err);
});
app.use(bodyParse.json());

app.get("/", (req, res) => {
  res.send("jasgdjk");
});

// app.get("/", controllers.home.index);

//Admin routes
app.get(
  "/addCar",
  // restrictedPages.hasRole("Admin"),
  controllers.admin.addCarGet
);
app.post(
  "/addCar",
  // restrictedPages.hasRole("Admin"),
  controllers.admin.addCarPost
);
app.post(
  "/adduser",
  // restrictedPages.hasRole("Admin"),
  controllers.user.registerPost
);
app.delete(
  "/delete/:id",
  // restrictedPages.hasRole("Admin"),
  controllers.admin.deleteCar
);
app.put(
  "/update/:id",
  // restrictedPages.hasRole("Admin"),
  controllers.admin.updateCar
);

//Query routes
app.get("/searchingModel", controllers.home.searchingModel);

//Car details
app.get(
  "/carDetails/:id",
  // restrictedPages.isAuthed,
  controllers.carDetails.viewDetails
);
app.post("/takeCar", controllers.carDetails.takeCar);
// app.get("/profile/:id", controllers.user.profile);

app.all("*", (req, res) => {
  res.status(404);
  res.send("404 Not Found");
  res.end();
});

app.listen(process.env.PORT);
