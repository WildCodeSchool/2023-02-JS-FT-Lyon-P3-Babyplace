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

  parentCancelHisReservation(parent, date, name, pro) {
    return this.database.query(
      `INSERT INTO pro_notification (type, status, description, notification_date_time, pro_id) VALUES 
      ('cancel', false, CONCAT(?, 'a annulé sa réservation du', ?, ' pour ', ?), NOW(), ?)`,
      [parent, date, name, pro]
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

  NotificationIsViewed() {
    return this.database.query(`update ${this.table}
    set status = 1`);
  }

  areThereAnyNotifications() {
    return this.database.query(
      `SELECT COUNT(*) as total from ${this.table} where status = 0`
    );
  }
}

module.exports = NotificationManager;
