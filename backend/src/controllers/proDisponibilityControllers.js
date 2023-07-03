const models = require("../models");

const add = (req, res) => {
  models.proDisponibility
    .insert(req.body.dayId, req.body.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  add,
};
