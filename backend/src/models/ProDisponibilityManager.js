const AbstractManager = require("./AbstractManager");

class ProDisponibilityManager extends AbstractManager {
  constructor() {
    super({ table: "pro_disponibility" });
  }

  insert(dayId, proId) {
    return this.database.query(
      `insert into ${this.table} (disponibility_id, pro_id) values (?, ?) `,
      [dayId, proId]
    );
  }
}

module.exports = ProDisponibilityManager;
