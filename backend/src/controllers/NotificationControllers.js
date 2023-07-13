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

const AllNotificationsAreRead = (req, res) => {
  models.notify
    .NotificationIsViewed()
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

const getNumberOfNewNotifications = (req, res) => {
  models.notify
    .areThereAnyNotifications()
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
  AllNotificationsAreRead,
  getNumberOfNewNotifications,
};
