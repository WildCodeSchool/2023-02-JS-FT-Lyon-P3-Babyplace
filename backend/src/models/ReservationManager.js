const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  add(data) {
    return this.database.query(
      `INSERT INTO ${this.table} (date_time_reservation, reservation_date, status, child_id, place_id) VALUES (NOW(), ?, '0', ?, ?)`,
      [data.day, data.childId, data.placeId]
    );
  }

  findParentReservation(id, date) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `SELECT t.id, place.pro_id proId, t.status, DATE_FORMAT(t.reservation_date, "%d/%m/%Y") reservationDate, DATE_FORMAT(t.date_time_reservation, "%d/%m/%Y") dateTimeReservation, p.firstname parent_firstname, p.lastname parent_lastname, c.firstname, c.lastname FROM ${this.table} as t JOIN child AS c ON t.child_id = c.id JOIN place ON t.place_id = place.id JOIN parent as p ON c.parent_id = p.id WHERE p.id = ? AND t.reservation_date >= ? order by t.status ASC, t.reservation_date ASC`,
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
