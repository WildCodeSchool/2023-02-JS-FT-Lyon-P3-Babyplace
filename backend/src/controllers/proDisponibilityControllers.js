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

// const GetAvailableDaysOfPro = async (req, res, next) => {
//   const id = parseInt(req.params.id, 10);
//   try {
//     const daysOfThePro = await models.proDisponibility.findAll;
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Erreur interne");
//   }
// };

module.exports = {
  add,
  listProDisponibilities,
  destroy,
  // GetAvailableDaysOfPro,
};
