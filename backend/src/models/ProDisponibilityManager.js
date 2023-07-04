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

  findAll(proId) {
    return this.database.query(
      `select d.day from ${this.table} as t join disponibility as d on d.id = t.disponibility_id where t.pro_id = ?`,
      [proId]
    );
  }

  delete(dayId, proId) {
    return this.database.query(
      `delete from ${this.table} where disponibility_id = ? and pro_id = ? `,
      [dayId, proId]
    );
  }
}

module.exports = ProDisponibilityManager;
