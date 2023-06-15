const AbstractManager = require("./AbstractManager");

class ProManager extends AbstractManager {
  constructor() {
    super({ table: "pro" });
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = ProManager;
