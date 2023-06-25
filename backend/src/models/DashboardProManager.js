const AbstractManager = require("./AbstractManager");

class DashboardProManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  showAllReservations() {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database
      .query(`select r.id, c.firstname prenom_enfant, c.lastname nom_enfant,
    p.firstname prenom_parent, p.lastname nom_parent, DATE_FORMAT(reservation_date, "%d/%m/%Y") date_reservation,  DATE_FORMAT(date_time_reservation, "%d/%m/%Y") date_enregistrement, r.status from ${this.table} as r
   join child as c on c.id = r.child_id
   join parent as p on c.parent_id = p.id
   order by r.reservation_date asc`);
  }

  moreDetailOrder(id) {
    return this.database.query(
      `select r.id, c.firstname prenom_enfant, c.lastname nom_enfant, c.walking,
    p.firstname prenom_parent, p.lastname nom_parent,
	DATE_FORMAT(c.birthdate, "%d/%m/%Y") anniversaire,
    p.mail_address email, p.address adresse, p.postcode, p.city, p.phone_number telephone from ${this.table} as r
   join child as c on c.id = r.child_id
   join parent as p on c.parent_id = p.id
   where r.id = ? order by r.reservation_date asc`,
      [id]
    );
  }

  validThisOrder(id) {
    return this.database.query(
      `update ${this.table}
      set status = 1
      where id = ?`,
      [id]
    );
  }

  refuseThisOrder(id) {
    return this.database.query(
      `update ${this.table}
      set status = 2
      where id = ?`,
      [id]
    );
  }

  cancelThisOrder(id) {
    return this.database.query(
      `update ${this.table}
      set status = 3
      where id = ?`,
      [id]
    );
  }

  getChildOnThisDate(date) {
    return this.database.query(
      `select r.id,  DATE_FORMAT(reservation_date, "%d/%m/%Y") date_reservation, c.firstname prenom_enfant, c.lastname nom_enfant,
      r.status from reservation AS r
     join child AS c ON c.id = r.child_id
     where r.reservation_date = ?
     and r.status = 1`,
      [date]
    );
  }
}

module.exports = DashboardProManager;
