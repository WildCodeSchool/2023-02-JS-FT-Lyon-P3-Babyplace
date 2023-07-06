const models = require("../models");

const browse = (req, res) => {
  models.pro
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseProAndDispo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.pro
    .browseDispo(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.pro
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  let values = "";
  Object.entries(req.body).forEach((array) => {
    if (
      array[0] !== "empty" &&
      array[0] !== "disponibility" &&
      array[0] !== "place" &&
      array[0] !== "disponibilities" &&
      array[0] !== "placesToAdd" &&
      array[0] !== "rowsToDelete" &&
      array[0] !== "proId" &&
      array[0] !== "placeId" &&
      array[0] !== "disponibilitiesToRemove" &&
      array[0] !== "disponibilitiesToAdd" &&
      array[0] !== "daysToRemove" &&
      array[0] !== "daysToAdd" &&
      array !== undefined
    ) {
      values += `, ${array[0]} = "${array[1]}"`;
    }
  });
  values = values?.replace(", ", "");
  if (!values) {
    return res.sendStatus(204);
  }

  // TODO validations (length, format...)

  const id = req.payloads.sub;

  return models.pro
    .update(values, id)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        return res.sendStatus(204);
      }
      return res.sendStatus(500);
    })
    .catch((err) => {
      console.error(err);
    });
};

const add = (req, res, next) => {
  const pro = req.body;

  // TODO validations (length, format...)

  models.pro
    .insert(pro)
    .then(([result]) => {
      req.proId = result.insertId;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.pro
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const profile = (req, res) => {
  const id = req.payloads.sub;
  models.pro
    .find(id)
    .then(([users]) => {
      if (users[0] === null) {
        res.sendStatus(404);
      }
      res.send(users[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseProAndDispo,
  read,
  edit,
  add,
  destroy,
  profile,
};
