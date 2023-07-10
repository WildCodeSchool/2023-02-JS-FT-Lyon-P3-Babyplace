const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  findParentReservation(id, date) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `SELECT t.id, t.status, DATE_FORMAT(t.reservation_date, "%d/%m/%Y") reservationDate, DATE_FORMAT(t.date_time_reservation, "%d/%m/%Y") dateTimeReservation, c.firstname, c.lastname FROM ${this.table} as t JOIN child AS c ON t.child_id = c.id JOIN parent as p ON c.parent_id = p.id WHERE p.id = ? AND t.reservation_date >= ?`,
      [id, date]
    );
  }

  delete(parentId, reservationId) {
    return this.database.query(
      `update ${this.table} as t
      join child as c on c.id = t.child_id
      join parent as p on c.parent_id = p.id
      set status = 3
      where t.id = ? and p.id = ?`,
      [reservationId, parentId]
    );
  }
}

module.exports = ReservationManager;
