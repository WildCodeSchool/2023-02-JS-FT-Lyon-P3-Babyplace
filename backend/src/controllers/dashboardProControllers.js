const models = require("../models");

const browseReservations = (req, res) => {
  models.dashboardpro
    .showAllReservations()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.Status(500).send("There is a problem");
    });
};

module.exports = {
  browseReservations,
};
