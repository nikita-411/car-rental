const Car = require("mongoose").model("Car");
const User = require("mongoose").model("User");
const RentedCarInfo = require("mongoose").model("RentedCarInfo");

module.exports = {
  viewDetails: (req, res) => {
    let id = req.params.id;
    Car.findById(id).then(foundCar => {
      res.send(foundCar);
    });
  },
  takeCar: (req, res) => {
    let id = req.body.v_number;
    let userId = req.body.username;

    Car.findById(id).then(foundCar => {
      console.log(foundCar);
      //   if (!foudedCar.booking_status) {
      //   console.log("three");
      User.find({ username: userId }).then(user => {
        // console.log(user);
        // console.log(foundCar.v_number);
        user.rentedCars = foundCar.v_number;
        console.log("one");
        //   user.save();
        // user.save().then(() => {
        console.log("7");
        foundCar.booking_status = true;
        //   foundCar.save().then(() => {
        const post = new RentedCarInfo();
        (post.v_number = foundCar.v_number),
          (post.username = userId),
          (post.issue_date = req.body.issue_date),
          (post.return_date = req.body.return_date);
        // };
        post.save();
        res.send(post);

        // console.log(RentedCarInfoObj);
        // RentedCarInfo.create(RentedCarInfoObj).then(() => {
        //   res.send("Sucess!");
      });
      //   });
      // });
      //   }
    });
    //   }
  }
};
