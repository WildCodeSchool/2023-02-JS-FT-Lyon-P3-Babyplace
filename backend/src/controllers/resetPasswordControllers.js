const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const nodemailer = require("nodemailer");
const models = require("../models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyProEmail = (req, res, next) => {
  const { email } = req.body;
  models.pro
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        console.info(req.user);
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const verifyParentEmail = (req, res, next) => {
  const { email } = req.body;
  models.parent
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// I generate my token through uuidv4
// I save the token in my BDD and associate it with the user
// I transmit the token to the next middleware
const generatePasswordTokenForPro = (req, res, next) => {
  const { user } = req;
  user.passwordToken = uuidv4();
  models.reset
    .updatePasswordTokenForPro(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const generatePasswordTokenForParent = (req, res, next) => {
  const { user } = req;
  user.passwordToken = uuidv4();
  models.reset
    .updatePasswordTokenForParent(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});
const sendForgottenPassword = (req, res) => {
  transporter.sendMail(
    {
      from: "babyplace.pro@gmail.com",
      to: req.user.mail_address,
      subject: "Réinitialisation de votre mot de passe",
      text: "Bonjour, Vous recevez ce mail car vous avez choisi de réinitialiser votre mot passe. Si vous n'êtes pas à l'origne de cette démarche, veuillez contacter le support Babyplace immédiatement. Pour créer un nouveau mot de passe, cliquez ici ! À très vite sur Babyplace.",
      html: `<p>Bonjour,</p><br><p>Vous recevez ce mail car vous avez choisi de réinitialiser votre mot passe. Si vous n'êtes pas à l'origne de cette démarche, veuillez contacter le support Babyplace immédiatement.</p><br><p>Pour créer un nouveau mot de passe, <a href="http://localhost:5173/${
        req.user.role === "pro" ? "pro" : "parent"
      }/reinitialisation-mdp/${req.user.passwordToken}">cliquez ici !</
      a></p><br><p>À très vite sur Babyplace.`,
    },
    (err, info) => {
      console.error(`l'envoi de ce mail est ${info}`);
      if (err) {
        console.error(
          `l'erreur dans la tentative d'envoi de ce mail est : ${err}`
        );
        console.error(err);
        res.sendStatus(500);
      } else res.sendStatus(200);
    }
  );
};

// Verify if the tokenPassword exist
const verifyTokenPasswordPro = (req, res, next) => {
  const { passwordToken } = req.body;
  models.reset
    .selectTokenPro(passwordToken)
    .then(([users]) => {
      console.warn(users);
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else res.sendStatus(404);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(501);
    });
};

const verifyTokenPasswordParent = (req, res, next) => {
  const { passwordToken } = req.body;
  models.reset
    .selectTokenParent(passwordToken)
    .then(([users]) => {
      console.warn(users);
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else res.sendStatus(404);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(501);
    });
};

const hashNewPassword = (req, res, next) => {
  // hash du password avec argon2 puis next()
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashed_password = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

// Create and hash a new password
const resetPasswordPro = (req, res) => {
  const { user } = req;
  user.hashed_password = req.body.hashed_password;
  models.reset
    .updateProPasswordAfterReset(user)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(202);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const resetPasswordParent = (req, res) => {
  const { user } = req;
  user.hashed_password = req.body.hashed_password;
  models.reset
    .updateParentPasswordAfterReset(user)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(202);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  verifyProEmail,
  verifyParentEmail,
  generatePasswordTokenForPro,
  generatePasswordTokenForParent,
  sendForgottenPassword,
  verifyTokenPasswordPro,
  verifyTokenPasswordParent,
  resetPasswordPro,
  resetPasswordParent,
  hashNewPassword,
};
