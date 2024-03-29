const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.image
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.image
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
  const image = req.body;

  // TODO validations (length, format...)

  image.id = parseInt(req.params.id, 10);

  models.image
    .update(image)
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

const add = (req, res) => {
  const image = req.body;

  // TODO validations (length, format...)

  models.image
    .insert(image)
    .then(([result]) => {
      res.location(`/image/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.image
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
const upload = (req, res) => {
  // Récupérer le chemin de l'image temporaire
  const { originalname } = req.file;
  const { filename } = req.file;

  // Déplacer l'image temporaire vers le dossier "uploads"
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (error) => {
      if (error) throw error;
    }
  );
  // Construire l'URL complète de l'image
  const imageUrl = `${originalname}`;

  // Insérer l'URL de l'image dans la base de données

  models.image
    .insert(imageUrl)
    .then(([result]) => {
      return res
        .location(`/image/${result.insertId}`)
        .status(201)
        .send(imageUrl);
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  upload,
};
