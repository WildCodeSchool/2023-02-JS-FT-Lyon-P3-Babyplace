const models = require("../models");

const GetAllNotificationsForParent = (req, res) => {
  models.notify
    .getParentNotifications()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const GetAllNotificationsForPro = (req, res) => {
  models.notify
    .getProNotifications()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const AllParentNotificationsAreRead = (req, res) => {
  models.notify
    .parentNotificationIsViewed()
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
  models.notify
    .proNotificationIsViewed()
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
  models.notify
    .areThereAnyParentNotifications()
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getNumberOfProNewNotifications = (req, res) => {
  models.notify
    .areThereAnyProNotifications()
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
