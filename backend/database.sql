SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS parent;
CREATE TABLE parent (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(80) NOT NULL,
  firstname VARCHAR(80) NOT NULL,
  birthdate DATE NOT NULL,
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  hashed_password VARCHAR(100) NOT NULL,
  address VARCHAR(80) NOT NULL,
  postcode INT(5) NOT NULL,
  city VARCHAR(45) NOT NULL,
  phone_number INT(10) NOT NULL,
  notification_status BOOLEAN NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'parent'
);

DROP TABLE IF EXISTS child;
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

DROP TABLE IF EXISTS pro;
CREATE TABLE pro (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  hashed_password VARCHAR(100) NOT NULL,
  address VARCHAR(80),
  postcode INT(5),
  city VARCHAR(45),
  phone_number INT(10) NOT NULL,
  description VARCHAR(255),
  type VARCHAR(45),
  notification_status BOOLEAN NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'pro'
);

DROP TABLE IF EXISTS place;
CREATE TABLE place (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pro_id INT NOT NULL,
  CONSTRAINT place_pro FOREIGN KEY (pro_id) REFERENCES pro(id)
);

DROP TABLE IF EXISTS reservation;
CREATE TABLE reservation (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date_time_reservation DATETIME NOT NULL,
  reservation_date DATE NOT NULL,
  status INT NOT NULL,
  child_id INT NOT NULL,
  place_id INT NOT NULL,
  CONSTRAINT reservation_child FOREIGN KEY (child_id) REFERENCES child(id),
  CONSTRAINT reservation_place FOREIGN KEY (place_id) REFERENCES place(id)
);

DROP TABLE IF EXISTS disponibility;
CREATE TABLE disponibility (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  day VARCHAR(10)
);

DROP TABLE IF EXISTS pro_disponibility;
CREATE TABLE pro_disponibility (
  disponibility_id INT NOT NULL,
  pro_id INT NOT NULL,
  CONSTRAINT disponibility_pro FOREIGN KEY (pro_id) REFERENCES pro(id),
  CONSTRAINT pro_disponibility FOREIGN KEY (disponibility_id) REFERENCES disponibility(id)
);

DROP TABLE IF EXISTS pro_notification;
CREATE TABLE pro_notification (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(80) NOT NULL,
  status BOOLEAN NOT NULL,
  description VARCHAR(100) NOT NULL,
  notification_date_time DATETIME NOT NULL,
  pro_id INT NOT NULL,
  CONSTRAINT notification_pro FOREIGN KEY (pro_id) REFERENCES pro(id)
);

DROP TABLE IF EXISTS parent_notification;
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
  (lastname, firstname, birthdate, mail_address, password, hashed_password, address, postcode, city, phone_number, notification_status) 
  VALUES
  ('Dupont', 'Jean-Luc', '19751008', 'jeanluc.dupont@example.fr', 'testmdp', 'hashed password', '18 rue des mouettes', 99999, 'Ville Fictive', 0600000000, false),
  ('Dupond', 'Michel', '19800320', 'michel.dupond@example.fr', 'testmdp', 'hashed password', '52 boulevard des embruns', 99999, 'Ville Fictive', 0600000003, false);

  INSERT INTO pro
  (name, mail_address, password, hashed_password, address, postcode, city, phone_number, description, type, notification_status)
  VALUES
  ('Picoti Picota', 'picotita@example.fr', 'testmdp', 'hashed password', '22 place du soleil', 99999, 'Ville fictive', 0600000001, 'La crèche « Picoti Picota » n’est pas qu’un lieu de garde c’est surtout un lieu d’échange et d’accueil  des enfants et des familles dans une confiance réciproque où le respect, l’autonomie et la sécurité sont des références privilégiées dans notre projet. ', 'Micro-crèche', false),
  ('Coucou les chouchous', 'chouchous@coucou.fr', 'coucoumdp', 'hashed password', '18 rue des Albatros', 99999, 'Ville fictive', 0600000002, 'On aime les bambins, et on en prend soin', 'Crèche associative', false),
  ('Creche 3', 'creche@example.fr', '12345', '$argon2id$v=19$m=65536,t=5,p=1$PRp3VbzKhLRMsfvLIR84Kw$gGGsoTx8b+bf0335bbyS+8dE7EpJzrPGRxIESBc5vMA', '18 rue des Albatros', 99999, 'Ville fictive', 0600000002, 'Kikoo les zouzous', 'Micro-crèche', false);
  INSERT INTO child
  (lastname, firstname, birthdate, walking, doctor, parent_id)
  VALUES
  ('Dupont', 'Marcel', '20221224', false, 'Docteur Qui', 1),
  ('Dupond', 'Noe', '20191103', false, 'Docteur Folamour', 2),
  ('Dupond', 'Jade', '20191103', false, 'Docteur Folamour', 2);

  INSERT INTO disponibility
  (day)
  VALUES
  ('Lundi'), ('Mardi'), ('Mercredi'), ('Jeudi'), ('Vendredi'), ('Samedi'), ('Dimanche');

  INSERT into pro_disponibility
  (disponibility_id, pro_id)
  VALUES
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
  (1, 2), (2, 2), (4, 2), (5, 2);

  INSERT into place
  (pro_id)
  VALUES
  (1), (1), (1), (1), (1), (2), (2), (2);


SET FOREIGN_KEY_CHECKS = 1;