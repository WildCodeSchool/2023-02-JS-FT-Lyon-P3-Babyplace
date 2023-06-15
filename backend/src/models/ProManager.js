const AbstractManager = require("./AbstractManager");

class ProManager extends AbstractManager {
  constructor() {
    super({ table: "pro" });
  }

  browseDispo(proId) {
    return this.database.query(
      `SELECT day from ${this.table} AS p JOIN pro_disponibility AS pd ON p.id= pd.pro_id JOIN disponibility AS d ON d.id = pd.disponibility_id WHERE p.id=?`,
      [proId]
    );
  }
}
module.exports = ProManager;

/* SELECT p.name, d.day from pro AS p JOIN pro_disponibility AS pd ON p.id = pd.pro_id JOIN disponibility AS d ON d.id = pd.disponibility_id; */
