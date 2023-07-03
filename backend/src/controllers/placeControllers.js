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

module.exports = {
  add,
};
