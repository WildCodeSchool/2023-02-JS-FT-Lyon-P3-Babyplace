const AbstractManager = require("./AbstractManager");

class ParentManager extends AbstractManager {
  constructor() {
    super({ table: "parent" });
  }

  insert(parent) {
    return this.database.query(
      `insert into ${this.table} (lastname, firstname, birthdate, mail_address, password, hashed_password, address, postcode, city, phone_number, notification_status, role) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parent.lastname,
        parent.firstname,
        parent.birthdate,
        parent.mail_address,
        parent.password,
        parent.hashedPassword,
        parent.address,
        parent.postcode,
        parent.city,
        parent.phone_number,
        false,
        "parent",
      ]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }

  joinChildWithParent(id) {
    return this.database.query(
      `select c.lastname, c.firstname, DATE_FORMAT(c.birthdate, "%d/%m/%Y") birthdate, c.doctor from ${this.table} as p
       join child as c on c.parent_id = p.id
   where p.id = ?`,
      [id]
    );
  }
}

module.exports = ParentManager;
