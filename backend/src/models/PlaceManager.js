const AbstractManager = require("./AbstractManager");

class PlaceManager extends AbstractManager {
  constructor() {
    super({ table: "place" });
  }

  insert(place, id) {
    const placesArray = [];
    for (let i = 1; i <= place; i += 1) {
      placesArray.push([id]);
    }
    return this.database.query(`insert into ${this.table} (pro_id) values ?`, [
      placesArray,
    ]);
  }

  findTakenPlaces(id, day) {
    let query = `select count(r.place_id) as takenPlaces from ${this.table} as t`;
    if (day) {
      query += ` join reservation as r on t.id = r.place_id where pro_id = ? and r.reservation_date = ? and r.status in (0, 1)`;
    } else {
      query += ` where pro_id = ?`;
    }

    return this.database.query(query, [id, day]);
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
