const AbstractManager = require("./AbstractManager");

class PlaceManager extends AbstractManager {
  constructor() {
    super({ table: "place" });
  }

  insert(id, place) {
    const placesArray = [];
    for (let i = 1; i <= place; i += 1) {
      placesArray.push([id]);
    }
    return this.database.query(`insert into ${this.table} (pro_id) values ?`, [
      placesArray,
    ]);
  }

  findPlaces(id) {
    return this.database.query(
      `select count(*) as place from ${this.table} where pro_id = ?`,
      [id]
    );
  }

  findAllPlaces(proId) {
    return this.database.query(
      `select id from ${this.table} where pro_id = ?`,
      [proId]
    );
  }

  delete(values) {
    return this.database.query(
      `delete from ${this.table} where id in (${values})`
    );
  }
}

module.exports = PlaceManager;
