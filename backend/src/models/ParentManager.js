const AbstractManager = require("./AbstractManager");

class ParentManager extends AbstractManager {
  constructor() {
    super({ table: "parent" });
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = ParentManager;
