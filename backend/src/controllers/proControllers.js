const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const browse = (req, res) => {
  models.pro
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseProAndDispo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.pro
    .browseDispo(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.pro
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
  // TODO validations (length, format...)
  try {
    let pro = {};
    // On nettoie d'abord le corps de la requête pour ne pas envoyer de propriété inconnue dans la requête SQL
    // (il peut s'agir ici d'ajouts de propriétés pour la gestion des requêtes suivantes)
    Object.entries(req.body).forEach((array) => {
      if (
        array[0] !== "empty" &&
        array[0] !== "disponibility" &&
        array[0] !== "place" &&
        array[0] !== "disponibilities" &&
        array[0] !== "placesToAdd" &&
        array[0] !== "rowsToDelete" &&
        array[0] !== "daysToRemove" &&
        array[0] !== "daysToAdd" &&
        array !== undefined
      ) {
        pro = { ...pro, [array[0]]: array[1] };
      }
    });
    pro.id = req.payloads?.sub;

    // On met à jour le pro avec un objet propre
    await models.pro.update(pro);

    // Si des places sont à ajouter, on fait une requête SQL pour ajouter les places dans la table
    if (req.body.placesToAdd && req.body.placesToAdd > 0) {
      await models.place.insert(req.body.placesToAdd, pro.id);
    }
    // Si des disponibilités sont à ajouter, on fait une requête SQL pour ajouter les jours non présents dans la table pour ce pro
    if (req.body.daysToAdd && req.body.daysToAdd.length > 0) {
      const [disponibilitiesToAdd] = await models.disponibility.find(
        req.body.daysToAdd
      );
      await models.proDisponibility.insert(disponibilitiesToAdd, pro.id);
    }

    // Si des jours de disponibilité sont à supprimer, on fait une requête pour trouver l'id des disponibilités à supprimer
    // puis une requête pour les supprimer
    // puis une requête pour trouver les réservations en lien avec cette disponibilité
    // puis une requête pour changer le statut les réservations en lien avec cette disponibilité
    // puis une requête pour notifier les parents en lien avec ces réservations
    if (req.body.daysToRemove && req.body.daysToRemove.length > 0) {
      const [disponibilitiesToRemove] = await models.disponibility.find(
        req.body.daysToRemove
      );

      await models.proDisponibility.delete(disponibilitiesToRemove, pro.id);

      // on cherche la prochaine date relative à chaque jour à supprimer
      // puis on fait un tableau des dates concernées par les dates
      const futureDates = [];
      const today = new Date();
      for (let i = 1; i <= 7; i += 1) {
        const futureDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i,
          today.getHours()
        );
        futureDates.push(futureDate);
      }
      const datesToImpact = [];
      const daysOfTheWeek = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ];

      futureDates.forEach((day) => {
        const dayToFind = day.getDay();
        if (req.body.daysToRemove.includes(daysOfTheWeek[dayToFind])) {
          const formattedDay = [
            `${day.getFullYear()}`,
            `${day.getMonth() + 1}`,
            `${day.getDate()}`,
          ]
            .map((string) => (string.length === 1 ? `0${string}` : string))
            .join("-");
          datesToImpact.push(formattedDay);
        }
      });

      // on récupère un tableau des réservations à annuler (codes status 0 (en attente) et 1 (acceptée))
      const [reservationsToCancel] =
        await models.reservation.findReservationForProByDate(
          datesToImpact,
          pro.id
        );

      // On change le statut des réservations à 3 (annulée)
      if (reservationsToCancel.length > 0) {
        const reservationsIdArray = reservationsToCancel.map(
          (reservation) => reservation.reservationId
        );
        const parentIdArray = reservationsToCancel.map(
          (reservation) => reservation.parentId
        );
        await models.reservation.cancel(parentIdArray, reservationsIdArray);

        // On envoie une notification à chaque parent concerné par une des réservations annulées pour chacune d'entre elles
        const notifArray = reservationsToCancel.map((reservation) => {
          const formattedDay = [
            `${reservation.reservationDate.getDate()}`,
            `${reservation.reservationDate.getMonth() + 1}`,
            `${reservation.reservationDate.getFullYear()}`,
          ]
            .map((string) => (string.length === 1 ? `0${string}` : string))
            .join("/");

          const formattedToday = [
            `${today.getFullYear()}`,
            `${today.getMonth() + 1}`,
            `${today.getDate()}`,
          ]
            .map((string) => (string.length === 1 ? `0${string}` : string))
            .join("-");

          return [
            ["cancel"],
            [0],
            [
              `votre réservation du ${formattedDay} pour ${reservation.firstname} ${reservation.lastname} a été annulée`,
            ],
            [`${formattedToday}`],
            [`${reservation.parentId}`],
          ];
        });

        await models.notify.massNewCancelNotification(notifArray);
      }
    }

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erreur interne");
  }
};

const add = (req, res, next) => {
  const pro = req.body;

  // TODO validations (length, format...)

  models.pro
    .insert(pro)
    .then(([result]) => {
      req.proId = result.insertId;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.pro
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

const profile = (req, res) => {
  const id = req.payloads.sub;
  models.pro
    .find(id)
    .then(([users]) => {
      if (users[0] === null) {
        res.sendStatus(404);
      }
      res.send(users[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const login = async (req, res) => {
  try {
    // Lors du login du pro, on a besoin de connaître le nombre de places qu'il a par jour
    const [placesResult] = await models.place.countPlaces(req.user.id);
    req.user.place = placesResult[0].place;

    // On récupère également un tableau des différents jours de disponibilités de ce pro
    const [dispoResult] = await models.proDisponibility.findAll(req.user.id);
    const disponibilities = [];
    dispoResult.forEach((disponibility) => {
      disponibilities.push(disponibility.day);
    });
    req.user.disponibility = disponibilities;
    return res.send(req.user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erreur interne");
  }
};

const register = async (req, res) => {
  try {
    const pro = req.body;

    // TODO validations (length, format...)
    // On enregistre les infos du pro dans la table correspondante
    const [insertResult] = await models.pro.insert(pro);
    pro.id = insertResult.insertId;

    // Si le pro a indiqué des places, on en insère autant qu'il faut dans la table
    if (pro.place > 0) {
      await models.place.insert(pro.place, pro.id);
    }
    // Si le pro a indique des jours de disponibilité lors de son enregistrement, on les enregistre
    if (pro.disponibility.length > 0) {
      const [disponibilitiesToAdd] = await models.disponibility.find(
        pro.disponibility
      );
      await models.proDisponibility.insert(disponibilitiesToAdd, pro.id);
    }
    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erreur interne");
  }
};

const editAuth = (req, res) => {
  req.body.id = req.payloads.sub;
  const pro = req.body;
  console.warn(pro);
  // TODO validations (length, format...)

  models.pro
    .update(pro)
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

/* const upload = (req, res) => {
  let updatedPro = {};
  Object.entries(req.body).forEach((array) => {
    if (
      array[0] !== "name" &&
      array[0] !== "mail_address" &&
      array[0] !== "password" &&
      array[0] !== "hashed_password" &&
      array[0] !== "address" &&
      array[0] !== "postcode" &&
      array[0] !== "city" &&
      array[0] !== "phone_number" &&
      array[0] !== "description" &&
      array[0] !== "type" &&
      array[0] !== "description" &&
      array[0] !== "notification_status" &&
      array[0] !== "role" &&
      array[1] !== "" &&
      array !== undefined
    ) {
      updatedPro = { ...updatedPro, [array[0]]: array[1] };
    }
  });
  updatedPro.id = req.payloads?.sub;

  // Récupérer le chemin de l'image temporaire
  const { originalname } = req.file;
  const { filename } = req.file;

  // Déplacer l'image temporaire vers le dossier "uploads"
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (error) => {
      if (error) throw error;
    }
  );
  // Construire l'URL complète de l'image
  const image = `${uuidv4()}-${originalname}`;

  // Insérer l'URL de l'image dans la base de données

  models.pro
    .joinImageWithPro(image)
    .then(([result]) => {
      return res.location(`/pro/${result.insertId}`).status(201).send(image);
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}; */

const upload = async (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  const photoPath = `${uuidv4()}-${originalname}`;

  try {
    await fs.promises.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${photoPath}`
    );

    await models.pro.updatePicture({
      id: req.payloads.sub,
      image: photoPath,
    });
    res.send({ photoPath });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  browseProAndDispo,
  read,
  edit,
  add,
  destroy,
  profile,
  login,
  register,
  editAuth,
  upload,
};
