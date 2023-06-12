CREATE TABLE parent (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(80) NOT NULL,
  firstname VARCHAR(80) NOT NULL,
  birthdate DATE NOT NULL,
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  address VARCHAR(80) NOT NULL,
  postcode INT(5) NOT NULL,
  city VARCHAR(45) NOT NULL,
  phone_number INT(10) NOT NULL,
  notification_status BOOLEAN NOT NULL
);

CREATE TABLE child (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(80),
  firstname VARCHAR(80),
  birthdate DATE,
  walking BOOLEAN,
  doctor VARCHAR(80),
  parent_id INT NOT NULL,
  CONSTRAINT child_parent FOREIGN KEY (parent_id) REFERENCES parent(id)
);

CREATE TABLE pro (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  address VARCHAR(80),
  postcode INT(5),
  city VARCHAR(45),
  phone_number INT(10) NOT NULL,
  description VARCHAR(255),
  type VARCHAR(45),
  notification_status BOOLEAN NOT NULL
);

CREATE TABLE place (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pro_id INT NOT NULL,
  CONSTRAINT place_pro FOREIGN KEY (pro_id) REFERENCES pro(id)
);

CREATE TABLE reservation (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date_time_reservation DATETIME NOT NULL,
  reservation_date DATE NOT NULL,
  status VARCHAR(45) NOT NULL,
  child_id INT NOT NULL,
  place_id INT NOT NULL,
  CONSTRAINT reservation_child FOREIGN KEY (child_id) REFERENCES child(id),
  CONSTRAINT reservation_place FOREIGN KEY (place_id) REFERENCES place(id)
);

CREATE TABLE disponibility (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  day VARCHAR(10)
);

CREATE TABLE pro_disponibility (
  disponibility_id INT NOT NULL,
  pro_id INT NOT NULL,
  CONSTRAINT disponibility_pro FOREIGN KEY (pro_id) REFERENCES pro(id),
  CONSTRAINT pro_disponibility FOREIGN KEY (disponibility_id) REFERENCES disponibility(id)
);

CREATE TABLE pro_notification (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(80) NOT NULL,
  status BOOLEAN NOT NULL,
  description VARCHAR(100) NOT NULL,
  notification_date_time DATETIME NOT NULL,
  pro_id INT NOT NULL,
  CONSTRAINT notification_pro FOREIGN KEY (pro_id) REFERENCES pro(id)
);

CREATE TABLE parent_notification (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(80) NOT NULL,
  status BOOLEAN NOT NULL,
  description VARCHAR(100) NOT NULL,
  notification_date_time DATETIME NOT NULL,
  parent_id INT NOT NULL,
  CONSTRAINT notification_parent FOREIGN KEY (parent_id) REFERENCES parent(id)
);

  INSERT INTO parent
  (lastname, firstname, birthdate, mail_address, password, address, postcode, city, phone_number, notification_status) 
  VALUES
  ('Dupont', 'Jean-Luc', '19751008', 'jeanluc.dupont@example.fr', 'testmdp', '18 rue des mouettes', 99999, 'Ville Fictive', 0600000000, false);

  INSERT INTO pro
  (name, mail_address, password, address, postcode, city, phone_number, description, type, notification_status)
  VALUES
  ('Picoti Picota', 'picotita@example.fr', 'testmdp', '22 place du soleil', 99999, 'Ville fictive', 0600000001, 'Nous sommes une crèche qui prend soin de vos enfants.', 'Micro-crèche', false);

  INSERT INTO child
  (lastname, firstname, birthdate, walking, doctor, parent_id)
  VALUES
  ('Dupont', 'Marcel', '20221224', false, 'Docteur Qui', 1);

  INSERT INTO disponibility
  (day)
  VALUES
  ('monday'), ('tuesday'), ('wednesday'), ('thursday'), ('friday'), ('saturday'), ('friday');

  INSERT into pro_disponibility
  (disponibility_id, pro_id)
  VALUES
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1);

  INSERT into place
  (pro_id)
  VALUES
  (1), (1), (1), (1), (1);

-- Requête pour consulter les jours de disponibilité d'une crèche
SELECT p.name, d.day from pro AS p JOIN pro_disponibility AS pd ON p.id = pd.pro_id JOIN disponibility AS d ON d.id = pd.disponibility_id; 

-- Requête pour connaître le nombre de disponibilités d'une crèche
SELECT count(pl.id) AS places_for_pro from place AS pl LEFT JOIN pro AS pr ON pr.id = pl.pro_id;