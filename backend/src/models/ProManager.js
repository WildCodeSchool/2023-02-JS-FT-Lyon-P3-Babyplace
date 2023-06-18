const AbstractManager = require("./AbstractManager");

class ProManager extends AbstractManager {
  constructor() {
    super({ table: "pro" });
  }

  insert(pro) {
    return this.database.query(
      `insert into ${this.table} (name, mail_address, password, hashed_password, address, postcode, city, phone_number, description, type, notification_status, role) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pro.name,
        pro.mail_address,
        pro.password,
        pro.hashedPassword,
        pro.address,
        pro.postcode,
        pro.city,
        pro.phone_number,
        pro.description,
        pro.type,
        false,
        "pro",
      ]
    );
  }

  findByEmailWithPassword(email) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }
}

module.exports = ProManager;
