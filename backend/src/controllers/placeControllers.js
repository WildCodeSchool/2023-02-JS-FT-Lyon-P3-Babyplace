const models = require("../models");

const add = (req, res, next) => {
  if (req.body.placesToAdd === 0) {
    return next();
  }
  const id = req.payloads?.sub || req.proId;
  const place = req.body.placesToAdd || req.body.place;
  return models.place
    .insert(id, place)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.error(err);
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
  // S'il n'y a pas de places à supprimer, on passe à la suite
  if (req.body.rowsToDelete === 0) next();
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
      return next();
    })
    .catch((err) => {
      console.error(err);
    });
};

const destroy = (req, res, next) => {
  // S'il n'y a pas de places à supprimer, on passe à la suite
  if (req.body.rowsToDelete === 0) {
    return next();
  }
  const values = [];
  for (let i = 0; i < req.body.rowsToDelete; i += 1) {
    values.push(req.body.placeId[i]);
  }
  return models.place
    .delete(values.join(", "))
    .then(() => {
      return next();
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
