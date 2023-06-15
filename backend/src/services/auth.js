const models = require("../models");

const getParentByEmail = (req, res, next) => {
  models.parent
    .findByEmailWithPassword(req.body.email)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else {
        // If user with this mail doesnt exist
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getProByEmail = (req, res, next) => {
  models.pro
    .findByEmailWithPassword(req.body.email)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else {
        // If user with this mail doesnt exist
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getParentByEmail,
  getProByEmail,
};
