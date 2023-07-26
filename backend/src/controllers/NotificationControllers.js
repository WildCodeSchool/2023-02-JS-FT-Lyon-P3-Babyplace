const models = require("../models");

const GetAllNotificationsForParent = (req, res) => {
  const id = req.payloads.sub;
  const { date } = req.query;
  models.notify
    .getParentNotifications(id, date)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const GetAllNotificationsForPro = (req, res) => {
  const id = req.payloads.sub;
  const { date } = req.query;
  models.notify
    .getProNotifications(id, date)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const AllParentNotificationsAreRead = (req, res) => {
  const id = req.payloads.sub;
  const { date } = req.query;
  models.notify
    .parentNotificationIsViewed(id, date)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(204);
      }
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const AllProNotificationsAreRead = (req, res) => {
  const { date } = req.query;
  const id = req.payloads.sub;
  models.notify
    .proNotificationIsViewed(id, date)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.sendStatus(204);
      }
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getNumberOfParentNewNotifications = (req, res) => {
  const id = req.payloads.sub;
  models.notify
    .areThereAnyParentNotifications(id)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getNumberOfProNewNotifications = (req, res) => {
  const id = req.payloads.sub;
  models.notify
    .areThereAnyProNotifications(id)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  GetAllNotificationsForParent,
  GetAllNotificationsForPro,
  AllParentNotificationsAreRead,
  AllProNotificationsAreRead,
  getNumberOfParentNewNotifications,
  getNumberOfProNewNotifications,
};
