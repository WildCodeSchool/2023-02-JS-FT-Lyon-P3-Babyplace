const models = require("../models");

const findByName = (req, res, next) => {
  if (req.body.daysToAdd?.length === 0 && req.body.daysToRemove?.length === 0) {
    return next();
  }

  if (req.body.daysToRemove.length > 0) {
    return models.disponibility
      .find(req.body.daysToRemove)
      .then(([result]) => {
        if (result[0]) {
          req.body.disponibilitiesToRemove = result;
          req.body.daysToRemove = [];
          next();
        } else {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (req.body.daysToAdd.length > 0) {
    return models.disponibility
      .find(req.body.daysToAdd)
      .then(([result]) => {
        if (result[0]) {
          req.body.disponibilitiesToAdd = result;
          req.body.daysToAdd = [];
          next();
        } else {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (req.body.disponibility && !req.body.daysToAdd && !req.body.daysToRemove) {
    return models.disponibility
      .find(req.body.disponibility)
      .then(([result]) => {
        if (result[0]) {
          req.body.disponibilitiesToAdd = result;
          next();
        } else {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return next();
};
module.exports = {
  findByName,
};
