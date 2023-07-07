const models = require("../models");

const findByName = (req, res) => {
  return models.disponibility
    .find(req.body.disponibility)
    .then(([result]) => {
      if (result[0]) {
        return res.send(result);
      }
      return res.sendStatus(404);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
};
module.exports = {
  findByName,
};
