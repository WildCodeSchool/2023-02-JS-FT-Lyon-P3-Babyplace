const models = require("../models");

const findByName = (req, res, next) => {
  models.disponibility
    .find(req.body.day)
    .then(([result]) => {
      if (result[0]) {
        req.body.dayId = result[0].id;
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
