const AbstractManager = require("./AbstractManager");

class PlaceManager extends AbstractManager {
  constructor() {
    super({ table: "place" });
  }

  insert(id) {
    return this.database.query(
      `insert into ${this.table} (pro_id) values (?)`,
      [id]
    );
  }
}

module.exports = PlaceManager;
