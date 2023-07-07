const models = require("../models");

const add = (req, res) => {
  const id = req.payloads?.sub || req.proId;
  models.proDisponibility
    .insert(req.body.disponibilities, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const listProDisponibilities = (req, res, next) => {
  models.proDisponibility
    .findAll(req.user.id)
    .then(([result]) => {
      if (result) {
        const disponibilities = [];
        result.forEach((disponibility) => {
          disponibilities.push(disponibility.day);
        });
        req.user.disponibility = disponibilities;
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const destroy = (req, res) => {
  const id = req.payloads.sub;
  models.proDisponibility
    .delete(req.body.disponibilities, id)
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
  listProDisponibilities,
  destroy,
};
