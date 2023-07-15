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

    // On met à jour le pro aec un objet propre
    await models.pro
      .update(pro)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          return res.sendStatus(404);
        }
        return null;
      })
      .catch((err) => {
        console.error(err);
        return res.send(500);
      });

    // Si des places sont à ajouter, on fait une requête SQL pour ajouter les places dans la table
    if (req.body.placesToAdd && req.body.placesToAdd > 0) {
      await models.place
        .insert(req.body.placesToAdd, pro.id)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(404);
          }
          return null;
        })
        .catch((err) => {
          console.error(err);
          return res.send(500);
        });
    }
    // Si des disponibilités sont à ajouter, on fait une requête SQL pour ajouter les jours non présents dans la table pour ce pro
    if (req.body.daysToAdd && req.body.daysToAdd.length > 0) {
      const [disponibilitiesToAdd] = await models.disponibility.find(
        req.body.daysToAdd
      );
      await models.proDisponibility
        .insert(disponibilitiesToAdd, pro.id)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(404);
          }
          return null;
        })
        .catch((err) => {
          console.error(err);
          return res.send(500);
        });
    }

    // Si des jours de disponibilité sont à supprimer, on fait une requête pour trouver l'id des disponibilités à supprimer
    // puis une requête pour les supprimer
    // puis une requête pour trouver les réservations en lien avec cette disponibilité
    // puis une requête pour notifier les parents en lien avec ces réservations
    if (req.body.daysToRemove && req.body.daysToRemove.length > 0) {
      const [disponibilitiesToRemove] = await models.disponibility.find(
        req.body.daysToRemove
      );
      console.info(disponibilitiesToRemove);
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
  // Lors du login du pro, on a besoin de connaître le nombre de places qu'il a par jour
  await models.place
    .countPlaces(req.user.id)
    .then(([result]) => {
      if (result) {
        req.user.place = result[0].place;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  // On récupère également un tableau des différents jours de disponibilités de ce pro
  models.proDisponibility
    .findAll(req.user.id)
    .then(([result]) => {
      if (result) {
        const disponibilities = [];
        result.forEach((disponibility) => {
          disponibilities.push(disponibility.day);
        });
        req.user.disponibility = disponibilities;
        res.send(req.user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const register = async (req, res) => {
  try {
    const pro = req.body;

    // TODO validations (length, format...)
    // On enregistre les infos du pro dans la table correspondante
    await models.pro
      .insert(pro)
      .then(([result]) => {
        if (result.insertId) {
          pro.id = result.insertId;
          return null;
        }
        return res.send(500);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    // Si le pro a indiqué des places, on en insère autant qu'il faut dans la table
    if (pro.place > 0) {
      await models.place
        .insert(pro.place, pro.id)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(500);
          }
          return null;
        })
        .catch((err) => {
          console.error(err);
          return res.send(500);
        });
    }
    // Si le pro a indique des jours de disponibilité lors de son enregistrement, on les enregistre
    if (pro.disponibility.length > 0) {
      const [disponibilitiesToAdd] = await models.disponibility.find(
        pro.disponibility
      );
      await models.proDisponibility
        .insert(disponibilitiesToAdd, pro.id)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            return res.sendStatus(500);
          }
          return null;
        })
        .catch((err) => {
          console.error(err);
          return res.send(500);
        });
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
};
