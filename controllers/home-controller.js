const Car = require("mongoose").model("Car");

module.exports = {
  index: (req, res) => {
    let page = Number(req.query.page);
    if (Object.keys(req.query).length === 0) {
      page = 0;
    }
    console.log(req.query);
    let prevPage = page - 1;
    let nextPage = page + 1;
    Car.find({})
      .where("booking_status")
      .equals(false)
      .sort({ year: -1 })
      .skip(page * 5)
      .limit(5)
      .then(allCar => {
        if (prevPage < 0) prevPage = 0;

        let pageObj = {
          prevPage: prevPage,
          nextPage: nextPage
        };
        res.render("home/index", { allCar, pageObj });
      });
  },
  searchingModel: (req, res) => {
    let searchingModel = req.body.model;

    Car.find({ model: searchingModel }).then(allCars => {
      res.send(allCars);
    });
  }
};
