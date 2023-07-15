const AbstractManager = require("./AbstractManager");

class ResetPasswordManager extends AbstractManager {
  constructor() {
    super({ table: "pro" });
  }

  updatePasswordTokenForPro(user) {
    return this.database.query(
      `update ${this.table} set passwordToken = ? where id = ?`,
      [user.passwordToken, user.id]
    );
  }

  updatePasswordTokenForParent(user) {
    return this.database.query(
      `update parent set passwordToken = ? where id = ?`,
      [user.passwordToken, user.id]
    );
  }

  selectTokenPro(passwordToken) {
    return this.database.query(
      `select * from ${this.table} where passwordToken = ?`,
      [passwordToken]
    );
  }

  selectTokenParent(passwordToken) {
    return this.database.query(`select * from parent where passwordToken = ?`, [
      passwordToken,
    ]);
  }

  updateProPasswordAfterReset(user) {
    return this.database.query(
      `update ${this.table} set hashed_password = ?, passwordToken =
      NULL where id = ?`,
      [user.hashed_password, user.id]
    );
  }

  updateParentPasswordAfterReset(user) {
    return this.database.query(
      `update parent set hashed_password = ?, passwordToken =
      NULL where id = ?`,
      [user.hashed_password, user.id]
    );
  }
}

module.exports = ResetPasswordManager;
