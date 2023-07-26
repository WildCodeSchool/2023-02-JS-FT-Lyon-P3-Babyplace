const models = require("../models");

// la fonction suivante récupère toutes les notifs du pro en fontion de la page,
// c'est à dire avec un offset et une limit.
// on prend également en compte le status que l'on demande depuis le front.
const browseReservations = async (req, res) => {
  const id = req.payloads.sub;
  const { date } = req.query;
  const { status } = req.query;
  const { page } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await models.dashboardpro.countOrders(
      id,
      status,
      date
    );

    const [orders] = await models.dashboardpro.showAllReservations(
      id,
      limit,
      offset,
      status,
      date
    );

    res.send({ total, datas: orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

// on récupère les infos lié à une réservation lorsqu'on clique sur la loupe
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

// cette fonction change le statut d'une réservation de "en attente" à accepté puis
// crée une nouvelle nouvelle notification pour le parent concerné.
// Idem pour les fonction refuseOrder et cancelOrder.
const validateOrder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date } = req.query;
  const { name } = req.query;
  const { parent } = req.query;

  try {
    const validOrderResult = await models.dashboardpro.validThisOrder(id);
    if (validOrderResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    const newNotificationResult = await models.notify.newValidateNotification(
      date,
      name,
      parent
    );
    if (newNotificationResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

const refuseOrder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date } = req.query;
  const { name } = req.query;
  const { parent } = req.query;

  try {
    const validOrderResult = await models.dashboardpro.refuseThisOrder(id);
    if (validOrderResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    const newNotificationResult = await models.notify.newRefuseNotification(
      date,
      name,
      parent
    );
    if (newNotificationResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

const cancelOrder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date } = req.query;
  const { name } = req.query;
  const { parent } = req.query;

  try {
    const validOrderResult = await models.dashboardpro.cancelThisOrder(id);
    if (validOrderResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    const newNotificationResult = await models.notify.newCancelNotification(
      date,
      name,
      parent
    );
    if (newNotificationResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

// on récupère les enfants incrit sur ce jour
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

// on récupère les enfants incrit sur ce mois
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

// on récupère les infos du pro pour la prévisualisation du profil
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

// on récupère les enfant incrit ce jour dont ceux qui marche ou non
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
// on récupère les réservation en attente
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

// on récupère le nombre d'enfants incrit sur les 7 prochains jours
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
