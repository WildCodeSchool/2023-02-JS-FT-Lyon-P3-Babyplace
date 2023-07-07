const models = require("../models");

const add = (req, res, next) => {
  const id = req.payloads?.sub || req.proId;
  const place = req.body.placeId || req.body.place;
  models.place.insert(id, place).then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else if (req.proId) {
      next();
    } else {
      res.sendStatus(200);
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

const listPlaces = (req, res, next) => {
  const id = req.payloads.sub;
  models.place.findAllPlaces(id).then(([result]) => {
    if (result) {
      const placeId = [];
      result.forEach((place) => {
        placeId.push(place.id);
      });
      req.body.placeId = placeId;
      next();
    } else {
      res.sendStatus(404);
    }
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
      if (result.affectedRows !== 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  add,
  countPlaces,
  destroy,
  listPlaces,
};
