const models = require("../models");

const add = (req, res, next) => {
  const id = req.payloads?.sub || req.proId;
  return models.proDisponibility
    .insert(req.body.disponibilitiesToAdd, id)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.error(err);
    });
};

const listProDisponibilities = (req, res, next) => {
  models.proDisponibility
    .findAll(req.user.id)
    .then(([result]) => {
      if (result) {
        const disponibilities = [];
        result.forEach((disponibility) => {
          disponibilities.push(disponibility.day);
        });
        req.user.disponibility = disponibilities;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const destroy = (req, res, next) => {
  const id = req.payloads.sub;
  models.proDisponibility
    .delete(req.body.disponibilitiesToRemove, id)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next();
    });
  return next();
};

const GetAvailableDaysOfPro = async (req, res) => {
  const proId = parseInt(req.params.id, 10);
  console.info(`l'id du pro reçu du front est ${proId}`);
  try {
    const daysOfThePro = await models.proDisponibility.findAll(proId);
    console.info(`les jours d'ouverture ud pro sont : ${daysOfThePro}`);

    const maxPlaceOfPro = await models.place.countPlaces(proId);
    console.info(`le nombre de place max est : ${maxPlaceOfPro}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

module.exports = {
  add,
  listProDisponibilities,
  destroy,
  GetAvailableDaysOfPro,
};
