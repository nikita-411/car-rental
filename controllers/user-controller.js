const User = require("mongoose").model("User");
const Car = require("mongoose").model("Car");
const RentedCarInfo = require("mongoose").model("RentedCarInfo");

module.exports = {
  registerPost: (req, res) => {
    const post = new User();
    (post.username = req.body.username),
      (post.password = req.body.password),
      (post.rentedCars = req.body.rentedCars),
      (post.isAdmin = req.body.isAdmin);

    post.save();
    res.send(post);
  }
};
