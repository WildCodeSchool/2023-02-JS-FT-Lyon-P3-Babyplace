const models = require("../models");

const add = (req, res, next) => {
  if (
    !req.body.disponibilitiesToAdd ||
    req.body.disponibilitiesToAdd?.length === 0
  )
    return next();
  const id = req.payloads?.sub || req.proId;
  return models.proDisponibility
    .insert(req.body.disponibilitiesToAdd, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(500);
      }
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
  if (
    !req.body.disponibilitiesToRemove ||
    req.body.disponibilitiesToRemove?.length === 0
  )
    return next();
  const id = req.payloads.sub;
  return models.proDisponibility
    .delete(req.body.disponibilitiesToRemove, id)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        return next();
      }
      return res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  add,
  listProDisponibilities,
  destroy,
};
