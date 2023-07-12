const models = require("../models");

const browseReservations = async (req, res) => {
  const id = req.payloads.sub;
  const { status } = req.query;
  const { page } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  console.warn(`le status est ${status}`);
  try {
    const [[{ total }]] = await models.dashboardpro.countOrders(id, status);

    const [orders] = await models.dashboardpro.showAllReservations(
      id,
      limit,
      offset,
      status
    );
    // console.info(orders);
    res.send({ total, datas: orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
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
  const id = req.payloads.sub;
  models.dashboardpro
    .getChildOnThisDate(req.params.date, id)
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

const getAllReservationsForCalendar = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getAllTheReservations(req.params.month, id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const getProInfoForPreview = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getPreviewInfos(id)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const getProDaysForPreview = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getPreviewDays(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const getDataForToday = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getChartData(req.params.date, id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There is a problem");
    });
};

const browseReservationsWaiting = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getReservationsToReview(id)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.Status(500).send("There is a problem");
    });
};

const getOccupationRates = (req, res) => {
  const id = req.payloads.sub;
  models.dashboardpro
    .getOccupation(req.params.date, id)
    .then(([rows]) => {
      res.send(rows);
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
  getAllReservationsForCalendar,
  getProInfoForPreview,
  getProDaysForPreview,
  getDataForToday,
  browseReservationsWaiting,
  getOccupationRates,
};
