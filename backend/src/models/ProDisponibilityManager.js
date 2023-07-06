const AbstractManager = require("./AbstractManager");

class ProDisponibilityManager extends AbstractManager {
  constructor() {
    super({ table: "pro_disponibility" });
  }

  insert(disponibilitiesToAdd, proId) {
    const disponibilityArray = disponibilitiesToAdd.map((dispo) => [
      dispo.id,
      proId,
    ]);
    return this.database.query(
      `insert into ${this.table} (disponibility_id, pro_id) values ? `,
      [disponibilityArray]
    );
  }

  findAll(proId) {
    return this.database.query(
      `select d.day from ${this.table} as t join disponibility as d on d.id = t.disponibility_id where t.pro_id = ?`,
      [proId]
    );
  }

  delete(disponibilitiesToRemove, proId) {
    const disponibilityArray = disponibilitiesToRemove.map((dispo) => dispo.id);
    return this.database.query(
      `delete from ${this.table} where disponibility_id in (?) and pro_id = ? `,
      [disponibilityArray, proId]
    );
  }
}

module.exports = ProDisponibilityManager;
