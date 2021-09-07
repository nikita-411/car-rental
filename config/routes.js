const controllers = require("../controllers");
const restrictedPages = require("./auth");

module.exports = app => {
  app.get("/", controllers.home.index);

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
  app.delete(
    "/delete/:id",
    // restrictedPages.hasRole("Admin"),
    controllers.admin.deleteCar
  );
  app.put(
    "/update/:id",
    restrictedPages.hasRole("Admin"),
    controllers.admin.updateCar
  );

  //Query routes
  app.get("/searchingModel", controllers.home.searchingModel);

  //Car details
  app.get(
    "/carDetails/:id",
    restrictedPages.isAuthed,
    controllers.carDetails.viewDetails
  );
  app.post(
    "/takeCar",
    restrictedPages.isAuthed,
    controllers.carDetails.takeCar
  );
  app.get("/profile/:id", restrictedPages.isAuthed, controllers.user.profile);

  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
    res.end();
  });
};
