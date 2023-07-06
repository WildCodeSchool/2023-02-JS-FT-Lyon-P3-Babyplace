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

  insert(pro) {
    return this.database.query(
      `insert into ${this.table} (name, mail_address, password, hashed_password, address, postcode, city, phone_number, description, type, notification_status, role) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pro.name,
        pro.mail_address,
        pro.password,
        pro.hashedPassword,
        pro.address,
        pro.postcode,
        pro.city,
        pro.phone_number,
        pro.description,
        pro.type,
        false,
        "pro",
      ]
    );
  }

  update(values, id) {
    // const dataToUpdate = [];
    // const valuesToUpdate = [];
    // for (const data of Object.entries(info)) {
    //   if (
    //     data[0] !== "empty" &&
    //     data[0] !== "disponibility" &&
    //     data[0] !== "place" &&
    //     data[0] !== "disponibilities" &&
    //     data[0] !== "placesToAdd" &&
    //     data[0] !== "rowsToRemove" &&
    //     data[0] !== "proId"
    //   ) {
    //     dataToUpdate.push([data[0]]);
    //     valuesToUpdate.push([data[1]]);
    //   }
    // }
    return this.database.query(
      `update ${this.table} set ${values} where id = ?`,
      [id]
    );
  }

  findByEmailWithPassword(email) {
    // TODO changer la méthode pour ne sélectionner que les infos importantes
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }

  findProByEmail(email) {
    return this.database.query(
      `SELECT id FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }
}

module.exports = ProManager;
