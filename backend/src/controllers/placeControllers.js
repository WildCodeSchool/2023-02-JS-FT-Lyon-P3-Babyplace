const models = require("../models");

const add = (req, res) => {
  const id = req.payloads?.sub || req.proId;
  const place = req.body.placesToAdd || req.body.place;
  models.place
    .insert(place, id)
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return res.sendStatus(200);
      }
      return res.sendStatus(500);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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

const listPlaces = (req, res, next) => {
  const id = req.payloads.sub;
  models.place
    .findAllPlaces(id)
    .then(([result]) => {
      if (result) {
        const placeId = [];
        result.forEach((place) => {
          placeId.push(place.id);
        });
        req.body.placeId = placeId;
        return next();
      }
      return res.sendStatus(404);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
};

const destroy = (req, res) => {
  const values = [];
  for (let i = 0; i < req.body.rowsToDelete; i += 1) {
    values.push(req.body.placeId[i]);
  }
  models.place
    .delete(values.join(", "))
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return res.sendStatus(200);
      }
      return res.sendStatus(500);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

module.exports = {
  add,
  countPlaces,
  destroy,
  listPlaces,
};
