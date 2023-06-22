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

const showMoreInfoOnOrder = (req, res) => {
  models.dashboardpro
    .moreDetailOrder(parseInt(req.params.id, 10))
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

module.exports = {
  browseReservations,
  showMoreInfoOnOrder,
};
