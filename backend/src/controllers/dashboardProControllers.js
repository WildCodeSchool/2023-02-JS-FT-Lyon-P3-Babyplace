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
const validateOrder = (req, res) => {
  models.dashboardpro
    .validThisOrder(parseInt(req.params.id, 10))
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const refuseOrder = (req, res) => {
  models.dashboardpro
    .refuseThisOrder(parseInt(req.params.id, 10))
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const cancelOrder = (req, res) => {
  models.dashboardpro
    .cancelThisOrder(parseInt(req.params.id, 10))
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const getDateOrder = (req, res) => {
  models.dashboardpro
    .getChildOnThisDate(req.params.date)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
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
  validateOrder,
  refuseOrder,
  cancelOrder,
  getDateOrder,
};
