const AbstractManager = require("./AbstractManager");

class NotificationManager extends AbstractManager {
  constructor() {
    super({ table: "parent_notification" });
  }

  getParentNotifications(id, date) {
    return this.database.query(
      `SELECT * FROM ${this.table} where parent_id = ?
      and notification_date_time >= ?
      order by status ASC, notification_date_time DESC`,
      [id, date]
    );
  }

  getProNotifications(id, date) {
    return this.database.query(
      `SELECT * FROM pro_notification where pro_id = ?
      and notification_date_time >= ?
      order by status ASC, notification_date_time DESC`,
      [id, date]
    );
  }

  parentHaveCanceledHisReservation(parentname, date, childname, pro) {
    return this.database.query(
      `INSERT INTO pro_notification (type, status, description, notification_date_time, pro_id) VALUES 
      ('cancel', false, CONCAT(?, ' a annulé sa réservation du ', ?, ' pour ', ?), NOW(), ?)`,
      [parentname, date, childname, pro]
    );
  }

  newValidateNotification(date, name, parent) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES 
      ('validation', false, CONCAT('Votre réservation du ', ?, ' pour ', ?, ' a été acceptée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  newRefuseNotification(date, name, parent) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES 
      ('refuse', false, CONCAT('Votre réservation du ', ?, ' pour ', ?, ' a été refusée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  newCancelNotification(date, name, parent) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES 
      ('cancel', false, CONCAT('Votre réservation du ', ?, ' pour ', ?, ' a été annulée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  parentNotificationIsViewed(id, date) {
    return this.database.query(
      `update ${this.table}
    set status = 1 where parent_id = ?
    and notification_date_time >= ?`,
      [id, date]
    );
  }

  proNotificationIsViewed(id, date) {
    return this.database.query(
      `update pro_notification
    set status = 1 where pro_id = ?
    and notification_date_time >= ?`,
      [id, date]
    );
  }

  areThereAnyParentNotifications(id) {
    return this.database.query(
      `SELECT COUNT(*) as total from ${this.table} where status = 0 and parent_id = ?`,
      [id]
    );
  }

  areThereAnyProNotifications(id) {
    return this.database.query(
      `SELECT COUNT(*) as total from pro_notification where status = 0 and pro_id = ?`,
      [id]
    );
  }

  massNewCancelNotification(array) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES ?`,
      [array]
    );
  }
}

module.exports = NotificationManager;
