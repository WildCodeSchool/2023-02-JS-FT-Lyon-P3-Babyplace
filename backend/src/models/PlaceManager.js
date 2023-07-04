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

  findPlaces(id) {
    return this.database.query(
      `select count(*) as place from ${this.table} where pro_id = ?`,
      [id]
    );
  }
}

module.exports = PlaceManager;
