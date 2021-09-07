const Car = require("mongoose").model("Car");

module.exports = {
  addCarGet: (req, res) => {
    const post = Car.find({});
    res.send(post);
  },
  addCarPost: (req, res) => {
    const post = new Car();
    (post.v_number = req.body.v_number),
      (post.model = req.body.model),
      (post.city = req.body.city),
      (post.seats = req.body.seats),
      (post.rent_per_day = req.body.rent_per_day),
      (post.booking_status = req.body.booking_status);

    post.save();
    res.send(post);
  },

  updateCar: (req, res) => {
    // Validate Request
    if (!req.body.model) {
      return res.status(400).send({
        message: "Car content can not be empty"
      });
    }

    // Find Car and update it with the request body
    Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(car => {
        if (!car) {
          return res.status(404).send({
            message: "Car not found with id " + req.params.id
          });
        }
        res.send(car);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Car not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Error updating car with id " + req.params.id
        });
      });
  },

  deleteCar: (req, res) => {
    Car.findByIdAndRemove(req.params.id)
      .then(car => {
        if (!car) {
          return res.status(404).send({
            message: "Car not found with id " + req.params.id
          });
        }
        res.send({ message: "Car deleted successfully!" });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Car not found with id " + req.params.id
          });
        }
        return res.status(500).send({
          message: "Could not delete car with id " + req.params.id
        });
      });
  }
};
