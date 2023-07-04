const models = require("../models");

const add = (req, res) => {
  models.place.insert(req.body.id).then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
};

const countPlaces = (req, res, next) => {
  models.place
    .findPlaces(req.user.id)
    .then(([result]) => {
      if (result) {
        req.user.place = result[0].place;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  add,
  countPlaces,
};
