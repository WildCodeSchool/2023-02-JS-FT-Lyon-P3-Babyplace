const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const getParentByEmail = (req, res, next) => {
  models.parent
    .findByEmailWithPassword(req.body.email)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else {
        // If parent with this mail doesnt exist
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
        // If pro with this mail doesnt exist
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      // on supprime le mot de passe en clair pour ne laisser que le mot de passe hashé.
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyPassword = (req, res, next) => {
  // check if the req.user.hashedPassword from previous is the same as the password given through the login
  // if so => we delete the hashedPassword from the req.user and give a token
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((isPasswordOk) => {
      if (isPasswordOk) {
        // on créé un token, encodé avec le mot de passe contenu dans le fichier d'environnement
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: JWT_TIMING, // le token expirera après la durée défini dans le .env
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
        next();
      } else res.sendStatus(401);
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(400);
    });
};

module.exports = {
  getParentByEmail,
  getProByEmail,
  verifyPassword,
  hashPassword,
};
