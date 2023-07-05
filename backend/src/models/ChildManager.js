const AbstractManager = require("./AbstractManager");

class ChildManager extends AbstractManager {
  constructor() {
    super({ table: "child" });
  }

  insert(child) {
    return this.database.query(
      `insert into ${this.table} (lastname, firstname, birthdate, walking, doctor, parent_id) values (?, ?, ?, ?, ?,?)`,
      [
        child.lastname,
        child.firstname,
        child.birthdate,
        child.walking,
        child.doctor,
        child.parent_id,
      ]
    );
  }
}

module.exports = ChildManager;
