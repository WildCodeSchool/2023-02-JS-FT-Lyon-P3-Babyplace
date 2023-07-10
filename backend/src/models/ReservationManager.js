const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  findParentReservation(id) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `SELECT t.status, DATE_FORMAT(t.reservation_date, "%d/%m/%Y") reservationDate, DATE_FORMAT(t.date_time_reservation, "%d/%m/%Y") dateTimeReservation, c.firstname, c.lastname FROM ${this.table} as t JOIN child AS c ON t.child_id = c.id JOIN parent as p ON c.parent_id = p.id WHERE p.id = ?`,
      [id]
    );
  }
}

module.exports = ReservationManager;
