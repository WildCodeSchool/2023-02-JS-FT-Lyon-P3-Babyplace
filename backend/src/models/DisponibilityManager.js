const AbstractManager = require("./AbstractManager");

class DisponibilityManager extends AbstractManager {
  constructor() {
    super({ table: "disponibility" });
  }

  find(day) {
    return this.database.query(`select id from ${this.table} where day = ?`, [
      day,
    ]);
  }
}

module.exports = DisponibilityManager;
