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

  findReservationForProByDate(dateArray, proId) {
    return this.database.query(
      `SELECT t.id reservationId, t.reservation_date reservationDate, t.status, c.firstname, c.lastname, p.id parentId FROM ${this.table} as t JOIN child AS c ON t.child_id = c.id JOIN place as pl ON t.place_id = pl.id JOIN parent as p ON c.parent_id = p.id WHERE pl.pro_id = ? AND t.reservation_date in (?) AND t.status in (0, 1)`,
      [proId, dateArray]
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

  cancel(parentId, reservationId) {
    return this.database.query(
      `update ${this.table} as t
      join child as c on c.id = t.child_id
      join parent as p on c.parent_id = p.id
      set status = 3
      where t.id in (?) and p.id in (?)`,
      [reservationId, parentId]
    );
  }

  getFullDaysThisWeek(tommorow, proId, place) {
    return this.database.query(
      `SELECT DATE_FORMAT(reservation_date, "%W") AS thisDateIsFull
      FROM ${this.table} AS r
      JOIN place ON r.place_id = place.id
      WHERE r.reservation_date >= ?
      AND place.pro_id = ?
      AND r.status in (0, 1)
      GROUP BY DATE_FORMAT(reservation_date, "%W")
      HAVING COUNT(r.id) = ?
      LIMIT 7;`,
      [tommorow, proId, place]
    );
  }
}

module.exports = ReservationManager;
