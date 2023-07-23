const models = require("../models");

const browse = (req, res) => {
  models.parent
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.parent
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  try {
    let updatedParent = {};
    Object.entries(req.body).forEach((array) => {
      if (
        array[0] !== "birthdate" &&
        array[0] !== "mail_address" &&
        array[0] !== "password" &&
        array[0] !== "hashed_password" &&
        array[0] !== "notification_status" &&
        array[0] !== "role" &&
        array[1] !== "" &&
        array !== undefined
      ) {
        updatedParent = { ...updatedParent, [array[0]]: array[1] };
      }
    });
    updatedParent.id = req.payloads?.sub;

    // Effectuer la mise à jour de l'objet parent dans la base de données
    const [result] = await models.parent.update(updatedParent);

    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }
    const [[parent]] = await models.parent.find(updatedParent.id);

    return res.status(201).send(parent);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erreur interne");
  }
};

const add = (req, res) => {
  const parent = req.body;

  // TODO validations (length, format...)

  models.parent
    .insert(parent)
    .then(([result]) => {
      res.location(`/parent/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.parent
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const showChildWithParent = (req, res) => {
  models.parent
    .joinChildWithParent(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const changeMailAddress = (req, res) => {
  req.body.id = req.payloads.sub;
  const parent = req.body;
  models.parent
    .update(parent)
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return res.sendStatus(200);
      }
      return null;
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const getReservations = (req, res) => {
  let requestDate = new Date();
  requestDate = [
    `${requestDate.getFullYear()}`,
    `${requestDate.getMonth() + 1}`,
    `${requestDate.getDate()}`,
  ]
    .map((string) => (string.length === 1 ? `0${string}` : string))
    .join("-");

  models.reservation
    .findParentReservation(req.payloads.sub, requestDate)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const cancelReservation = async (req, res) => {
  const parentId = req.payloads.sub;
  const reservationId = parseInt(req.params.id, 10);
  const { date } = req.query;
  const { childname } = req.query;
  const { parentname } = req.query;
  const { pro } = req.query;

  try {
    const cancelOrderResult = await models.reservation.delete(
      parentId,
      reservationId
    );
    if (cancelOrderResult[0].affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    const newNotificationResult =
      await models.notify.parentHaveCanceledHisReservation(
        parentname,
        date,
        childname,
        pro
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

const saveReservation = async (req, res) => {
  try {
    // on vérifie si l'enfant est déjà inscrit pour cette dae dans cette structure
    req.body.childId = parseInt(req.body.childId, 10);
    req.body.proId = parseInt(req.body.proId, 10);
    const [result] =
      await models.reservation.findReservationForThisDayWithProAndChild(
        req.body
      );
    // Si c'est le cas, on sort du try et on renvoie un message d'erreur
    if (result[0].count > 0) {
      return res.send(
        "Vous ne pouvez pas inscrire deux fois le même enfant pour la même journée dans cette crèche."
      );
    }
    // on liste d'abord le nombre de places maximum du professionnel
    const [proPlaces] = await models.place.findAllPlaces(req.body.proId);
    // on liste ensuite le nombre de places du professionnel déjà prises (status "en attente" (0) ou "accepté" (1)) pour le jour concerné
    const [takenPlaces] = await models.place.findTakenPlaces(
      req.body.proId,
      req.body.day
    );
    const availablePlaces = proPlaces.filter(
      (place) => !takenPlaces.find((takenPlace) => takenPlace.id === place.id)
    );
    // s'il n'y a pas de place disponible, on renvoie un message d'erreur
    if (availablePlaces.length === 0) {
      return res.send(
        "Maximum de places atteint pour cette crèche. La réservation n'a pu être validée."
      );
    }
    req.body.placeId = availablePlaces[0].id;
    const [{ affectedRows }] = await models.reservation.add(req.body);
    if (affectedRows === 0) {
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erreur interne");
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  showChildWithParent,
  changeMailAddress,
  getReservations,
  cancelReservation,
  saveReservation,
};
