const models = require("../models");

const findByName = (req, res, next) => {
  models.disponibility
    .find(req.body.disponibility || req.body.daysToRemove)
    .then(([result]) => {
      if (result[0]) {
        req.body.disponibilities = result;
        next();
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  findByName,
};
