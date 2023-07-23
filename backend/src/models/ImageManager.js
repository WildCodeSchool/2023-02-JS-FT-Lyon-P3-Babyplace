const AbstractManager = require("./AbstractManager");

class ImageManager extends AbstractManager {
  constructor() {
    super({ table: "image" });
  }

  insert(image) {
    return this.database.query(
      `insert into ${this.table} (image_url, pro_id) values (?, ?)`,
      [image.image_url, image.pro_id]
    );
  }

  update(image) {
    return this.database.query(
      `update ${this.table} set image_url = ? where id = ?`,
      [image.image_url, image.id]
    );
  }
}

module.exports = ImageManager;
