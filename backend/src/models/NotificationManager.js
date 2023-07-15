const AbstractManager = require("./AbstractManager");

class NotificationManager extends AbstractManager {
  constructor() {
    super({ table: "parent_notification" });
  }

  getParentNotifications() {
    return this.database.query(
      `SELECT * FROM ${this.table} order by status ASC, notification_date_time DESC `
    );
  }

  getProNotifications() {
    return this.database.query(
      `SELECT * FROM pro_notification order by status ASC, notification_date_time DESC `
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
      ('validation', false, CONCAT('votre réservation du ', ?, ' pour ', ?, ' a été acceptée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  newRefuseNotification(date, name, parent) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES 
      ('refuse', false, CONCAT('votre réservation du ', ?, ' pour ', ?, ' a été refusée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  newCancelNotification(date, name, parent) {
    return this.database.query(
      `INSERT INTO ${this.table} (type, status, description, notification_date_time, parent_id) VALUES 
      ('cancel', false, CONCAT('votre réservation du ', ?, ' pour ', ?, ' a été annulée'), NOW(), ?)`,
      [date, name, parent]
    );
  }

  parentNotificationIsViewed() {
    return this.database.query(`update ${this.table}
    set status = 1`);
  }

  proNotificationIsViewed() {
    return this.database.query(`update pro_notification
    set status = 1`);
  }

  areThereAnyParentNotifications() {
    return this.database.query(
      `SELECT COUNT(*) as total from ${this.table} where status = 0`
    );
  }

  areThereAnyProNotifications() {
    return this.database.query(
      `SELECT COUNT(*) as total from pro_notification where status = 0`
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
