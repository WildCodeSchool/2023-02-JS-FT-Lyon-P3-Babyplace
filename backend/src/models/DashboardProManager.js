const AbstractManager = require("./AbstractManager");

class DashboardProManager extends AbstractManager {
  constructor() {
    super({ table: "reservation" });
  }

  showAllReservations(id) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `select r.id, c.firstname prenom_enfant, c.lastname nom_enfant,
    p.firstname prenom_parent, p.lastname nom_parent, DATE_FORMAT(reservation_date, "%d/%m/%Y") date_reservation,  DATE_FORMAT(date_time_reservation, "%d/%m/%Y") date_enregistrement, r.status,  r.place_id, place.pro_id from ${this.table} as r
   join child as c on c.id = r.child_id
   join parent as p on c.parent_id = p.id
   join place on r.place_id = place.id
   WHERE place.pro_id = ?
   order by r.reservation_date asc`,
      [id]
    );
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

  getChildOnThisDate(date, id) {
    return this.database.query(
      `select r.id, DATE_FORMAT(reservation_date, "%d/%m/%Y") date_reservation,DATE_FORMAT(c.birthdate, "%d/%m/%Y") anniversaire, c.walking, c.firstname prenom_enfant, c.lastname nom_enfant,
      r.status from ${this.table} AS r
     join child AS c ON c.id = r.child_id
     join place on r.place_id = place.id
     where r.reservation_date = ?
     and place.pro_id = ?
     and r.status = 1`,
      [date, id]
    );
  }

  getAllTheReservations(month, id) {
    return this.database.query(
      `select r.id, DATE_FORMAT(reservation_date, "%d") date_reservation, r.status from ${this.table} as r join place on r.place_id = place.id where r.status = 1 and MONTH(reservation_date) = ? and place.pro_id = ?`,
      [month, id]
    );
  }

  getPreviewInfos(id) {
    return this.database.query(`select * from pro where id = ?`, [id]);
  }

  getPreviewDays(id) {
    return this.database.query(
      `SELECT day from pro AS p JOIN pro_disponibility AS pd ON p.id= pd.pro_id JOIN disponibility AS d ON d.id = pd.disponibility_id WHERE p.id= ?`,
      [id]
    );
  }

  getChartData(date, id) {
    return this.database.query(
      `select r.id, c.walking, r.status from ${this.table} AS r
     join child AS c ON c.id = r.child_id
     join place on r.place_id = place.id
     where r.reservation_date = ?
     and place.pro_id = ?
     and r.status = 1 `,
      [date, id]
    );
  }

  getReservationsToReview(id) {
    return this.database.query(
      `SELECT COUNT(*) as orders FROM ${this.table} as r
       join place on r.place_id = place.id
        WHERE status = 0
        and place.pro_id = ?`,
      [id]
    );
  }
}

module.exports = DashboardProManager;
// select d.day from pro_disponibility AS p join disponibility as d on p.disponibility_id = d.id where p.pro_id = ?
