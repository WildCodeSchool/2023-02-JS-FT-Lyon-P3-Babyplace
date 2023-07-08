const AbstractManager = require("./AbstractManager");

class DisponibilityManager extends AbstractManager {
  constructor() {
    super({ table: "disponibility" });
  }

  find(disponibility) {
    return this.database.query(
      `select id from ${this.table} where day in (?)`,
      [disponibility]
    );
  }
}

module.exports = DisponibilityManager;
