SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS parent;
CREATE TABLE parent (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(80) NOT NULL,
  firstname VARCHAR(80) NOT NULL,
  birthdate DATE NOT NULL,
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  hashed_password VARCHAR(100) NOT NULL,
  address VARCHAR(80) NOT NULL,
  postcode VARCHAR(5) NOT NULL,
  city VARCHAR(45) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  passwordToken VARCHAR(255) NULL,
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
  hashed_password VARCHAR(100) NOT NULL,
  address VARCHAR(80),
  postcode VARCHAR(5),
  city VARCHAR(45),
  phone_number VARCHAR(10) NOT NULL,
  description TEXT,
  type VARCHAR(45),
  passwordToken VARCHAR(255) NULL,
  notification_status BOOLEAN NOT NULL,
  image VARCHAR(200) NULL,
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
(lastname, firstname, birthdate, mail_address, hashed_password, address, postcode, city, phone_number, notification_status)
VALUES
('Dupont', 'Jean-Luc', '1975-10-08', 'jeanluc.dupont@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '18 rue des mouettes', '73280', 'Bonneville', '0685692054', false),
('Lefèvre', 'Sophie', '19821215', 'sophie.lefevre@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '25 Avenue des Roses', '75002', 'Paris', '0612345678', false),
('Martin', 'Julie', '19900620', 'julie.martin@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '10 Rue du Bonheur', '69001', 'Lyon', '0676543210', false),
('Dubois', 'Pierre', '19870403', 'pierre.dubois@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '5 Place de la Liberté', '13004', 'Marseille', '0643210987', false);

INSERT INTO pro
(name, mail_address, hashed_password, address, postcode, city, phone_number, description, type, notification_status, image)
VALUES
('Les Petits Chérubins', 'petitscherubins@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '12 Rue des Jardins', '75001', 'Paris', '0623456789', 'Les Petits Chérubins est une micro-crèche chaleureuse et accueillante située en plein cœur de Paris. Nous offrons un environnement sécurisé et stimulant où les enfants peuvent grandir et s''épanouir. Notre équipe dévouée et expérimentée veille à ce que chaque enfant reçoive des soins personnalisés et une attention bienveillante. Rejoignez-nous pour une expérience éducative et ludique !', 'Micro-crèche', false,'e4c0ba21-3108-4fa5-be9f-e1cf30e21750-pexels-markus-spiske-234137.jpg'),
('La Maison des Lutins', 'maisondeslutins@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '36 Avenue des Bois', '69003', 'Lyon', '0656789012', 'Bienvenue à La Maison des Lutins, une micro-crèche conviviale et familiale nichée dans un cadre verdoyant à Lyon. Notre équipe passionnée s''engage à fournir un environnement d''apprentissage sécurisé et stimulant pour les tout-petits. Nous encourageons l''autonomie et la créativité, tout en offrant une attention individualisée à chaque enfant. Venez découvrir notre univers ludique et éducatif !', 'Micro-crèche', false, '4fbd86a0-a860-4d3c-ac8e-9bb6975dcea0-pexels-yan-krukau-8612875.jpg'),
('Les P''tits Lutins', 'ptitslutins@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '8 Rue des Enfants', '13004', 'Marseille', '0654321098', 'Les P''tits Lutins est une micro-crèche joyeuse et dynamique située à Marseille. Nous offrons un cadre accueillant et sécurisé où les enfants peuvent explorer, apprendre et grandir. Notre équipe bienveillante et expérimentée veille à ce que chaque enfant reçoive des soins attentionnés et des activités adaptées à son développement. Joignez-vous à nous pour une expérience éducative enrichissante !', 'Micro-crèche', false, 'd7157e60-9e4c-4e8e-a6d3-123bfc45d002-pexels-markus-spiske-131777.jpg'),
('La Farandole Enchantée', 'farandoleenchantee@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '15 Rue des Étoiles', '33000', 'Bordeaux', '0643210987', 'Bienvenue à La Farandole Enchantée, une micro-crèche située dans la charmante ville de Bordeaux. Nous offrons un environnement sécurisé et ludique où les enfants peuvent explorer, créer et s''épanouir. Notre équipe dévouée est engagée à fournir des soins attentionnés et des activités stimulantes pour favoriser le développement global de chaque enfant. Rejoignez-nous pour une aventure inoubliable !', 'Micro-crèche', false, '5e8067dc-c655-4f0a-b80a-54d6d0fac72f-pexels-rdne-stock-project-8363565.jpg'),
('Les Joyeux P''tits Loups', 'joyeuxptitsloups@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '42 Avenue du Bonheur', '31000', 'Toulouse', '0669851475', 'Les Joyeux P''tits Loups est une micro-crèche animée et bienveillante située dans la charmante ville de Toulouse. Nous offrons un environnement sécurisé et stimulant où les enfants peuvent jouer, apprendre et grandir. Notre équipe expérimentée et attentive encourage l''autonomie et la socialisation, tout en respectant le rythme et les besoins individuels de chaque enfant. Rejoignez notre meute heureuse !', 'Micro-crèche', false, '41badc17-9f72-4b26-93b0-5fe6c6886a6c-pexels-yan-krukau-8612897.jpg'),
('La Cabane Magique', 'cabane.magique@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '24 Rue des Rêves', '44000', 'Nantes', '0634567890', 'Bienvenue à La Cabane Magique, une micro-crèche unique et pleine d''aventures à Nantes. Nous offrons un espace enchanteur où les enfants peuvent explorer, imaginer et se construire. Notre équipe passionnée et créative propose des activités ludiques et éducatives pour stimuler le développement de chaque enfant. Rejoignez-nous pour vivre des moments magiques et mémorables !', 'Micro-crèche', false, '4c837f0c-9bfe-4e61-b277-e4651de87ef1-pexels-yan-krukau-8435791.jpg'),
('Les P''tits Génies', 'ptitsgenies@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '18 Rue des Savoirs', '67000', 'Strasbourg', '0621436587', 'Les P''tits Génies est une micro-crèche dynamique et stimulante située à Strasbourg. Nous offrons un environnement d''apprentissage sécurisé et bienveillant où les enfants peuvent explorer leur curiosité et développer leurs talents. Notre équipe dévouée et compétente propose des activités adaptées à chaque stade de développement pour encourager la créativité et la confiance en soi. Rejoignez notre tribu brillante !', 'Micro-crèche', false, '38ee01de-4393-4ea4-a068-9ac448d2b901-pexels-yan-krukau-8435803.jpg'),
('La Maison des Artistes', 'maisondespetitsartistes@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$d/j6W93qKyXQpakCSGhi/A$u8A52LYvxgQI4IF5ODrqHClOW8qkS+dt/mp6beug/6Y', '10 Rue des Couleurs', '06000', 'Nice', '0646543210', 'Bienvenue à La Maison des Petits Artistes, une micro-crèche créative et inspirante à Nice. Nous offrons un espace sécurisé et coloré où les enfants peuvent laisser libre cours à leur imagination et développer leurs talents artistiques. Notre équipe passionnée et bienveillante encourage l''expression individuelle et la découverte artistique à travers des activités ludiques et stimulantes. Rejoignez notre galerie d''artistes en herbe !', 'Micro-crèche', false, 'a59aa828-4e05-4225-a00c-13b5eb0bb113-pexels-leonardo-luz-15396264.jpg');

  INSERT INTO child
(lastname, firstname, birthdate, walking, doctor, parent_id)
VALUES
('Dupont', 'Marcel', '2022-12-24', false, 'Docteur Chavallard', 1),
('Dupont', 'Sophie', '2018-06-10', true, 'Docteur Chavallard', 1),
('Lefèvre', 'Emma', '2019-03-18', false, 'Docteur Durand', 2),
('Martin', 'Lucas', '2017-09-01', true, 'Docteur Dubois', 3),
('Martin', 'Camille', '2020-11-28', false, 'Docteur Dubois', 3),
('Martin', 'Antoine', '2016-12-05', true, 'Docteur Dubois', 3),
('Dubois', 'Emma', '2019-08-02', true, 'Docteur Lefèvre', 4);

  INSERT INTO disponibility
  (day)
  VALUES
  ('Lundi'), ('Mardi'), ('Mercredi'), ('Jeudi'), ('Vendredi'), ('Samedi'), ('Dimanche');

  INSERT into pro_disponibility
  (disponibility_id, pro_id)
  VALUES
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
  (1, 2), (2, 2), (4, 2), (6, 2), (2, 3), (3, 3), (5, 3), (6, 3), (1, 4), (2, 4), (3, 4), (4, 4), (5, 4),
  (1, 5), (2, 5), (3, 5), (4, 5), (5, 5), (6, 5), (5, 6),
  (6, 6), (7, 6), (1, 7), (2, 7), (3, 7), (1, 8), (2, 8),
  (3, 8), (4, 8), (5, 8);

INSERT INTO place (pro_id)
VALUES
(1), (1), (1), (1), (1), (1), (1), (1), (1), (1),
(2), (2), (2), (2), (2), (2), (2), (2),
(3), (3), (3), (3), (3),
(4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4), (4),
(5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5), (5),
(6), (6), (6), (6), (6), (6),
(7), (7), (7), (7), (7), (7), (7), (7), (7), (7),
(8), (8), (8), (8), (8), (8), (8), (8);



INSERT INTO `reservation`(`date_time_reservation`, `reservation_date`, `status`, `child_id`, `place_id`) VALUES
( '2023-07-19', '2023-07-13', 1, 1, 24),
( '2023-07-19', '2023-07-13', 1, 2, 25),
( '2023-07-19', '2023-07-13', 1, 3, 26),
( '2023-07-19', '2023-07-13', 1, 4, 27),
( '2023-07-19', '2023-07-13', 1, 5, 28),
( '2023-07-19', '2023-07-13', 1, 6, 29),
( '2023-07-19', '2023-07-13', 1, 7, 30),
( '2023-07-19', '2023-07-13', 1, 1, 31),
( '2023-07-19', '2023-07-13', 1, 2, 32),
( '2023-07-19', '2023-07-13', 1, 3, 33),
( '2023-07-19', '2023-07-13', 1, 4, 34),
( '2023-07-19', '2023-07-13', 1, 5, 35),
( '2023-07-19', '2023-07-13', 1, 6, 36),
( '2023-07-19', '2023-07-13', 1, 7, 37),
( '2023-07-19', '2023-07-13', 1, 1, 38),
( '2023-07-19', '2023-07-13', 1, 2, 39),
( '2023-07-19', '2023-07-13', 1, 3, 40),
( '2023-07-19', '2023-07-13', 1, 4, 41),
( '2023-07-19', '2023-07-13', 1, 5, 42),
( '2023-07-19', '2023-07-13', 1, 6, 43),
( '2023-07-19', '2023-07-13', 1, 7, 44),
( '2023-07-19', '2023-07-13', 1, 1, 45),
( '2023-07-19', '2023-07-13', 1, 2, 46),

( '2023-07-19', '2023-07-17', 1, 1, 24),
( '2023-07-19', '2023-07-17', 1, 2, 25),
( '2023-07-19', '2023-07-17', 1, 3, 26),
( '2023-07-19', '2023-07-17', 1, 4, 27),
( '2023-07-19', '2023-07-17', 1, 5, 28),
( '2023-07-19', '2023-07-17', 1, 6, 29),
( '2023-07-19', '2023-07-17', 1, 7, 30),
( '2023-07-19', '2023-07-17', 1, 1, 31),
( '2023-07-19', '2023-07-17', 1, 2, 32),
( '2023-07-19', '2023-07-17', 1, 3, 33),
( '2023-07-19', '2023-07-17', 1, 4, 34),
( '2023-07-19', '2023-07-17', 1, 5, 35),
( '2023-07-19', '2023-07-17', 1, 6, 36),
( '2023-07-19', '2023-07-17', 1, 7, 37),
( '2023-07-19', '2023-07-17', 1, 1, 38),
( '2023-07-19', '2023-07-17', 1, 2, 39),

( '2023-07-19', '2023-07-18', 1, 1, 24),
( '2023-07-19', '2023-07-18', 1, 2, 25),
( '2023-07-19', '2023-07-18', 1, 1, 26),
( '2023-07-19', '2023-07-18', 1, 2, 27),
( '2023-07-19', '2023-07-18', 1, 1, 28),
( '2023-07-19', '2023-07-18', 1, 3, 29),

( '2023-07-19', '2023-07-19', 1, 1, 24),
( '2023-07-19', '2023-07-19', 1, 2, 25),
( '2023-07-19', '2023-07-19', 1, 1, 26),
( '2023-07-19', '2023-07-19', 1, 5, 27),
( '2023-07-19', '2023-07-19', 1, 1, 28),
( '2023-07-19', '2023-07-19', 1, 2, 29),
( '2023-07-19', '2023-07-19', 1, 3, 30),
( '2023-07-19', '2023-07-19', 1, 1, 31),
( '2023-07-19', '2023-07-19', 1, 5, 32),
( '2023-07-19', '2023-07-19', 1, 7, 33),
( '2023-07-19', '2023-07-19', 1, 1, 34),
( '2023-07-19', '2023-07-19', 1, 2, 35),
( '2023-07-19', '2023-07-19', 1, 1, 36),
( '2023-07-19', '2023-07-19', 1, 4, 37),
( '2023-07-19', '2023-07-19', 1, 1, 38),
( '2023-07-19', '2023-07-19', 1, 3, 39),
( '2023-07-19', '2023-07-19', 1, 1, 40),
( '2023-07-19', '2023-07-19', 1, 5, 41),
( '2023-07-19', '2023-07-19', 1, 1, 42),
( '2023-07-19', '2023-07-19', 1, 1, 43),
( '2023-07-19', '2023-07-19', 1, 5, 44),
( '2023-07-19', '2023-07-19', 1, 4, 45),
( '2023-07-19', '2023-07-19', 1, 6, 46),

( '2023-07-19', '2023-07-20', 1, 1, 24),
( '2023-07-19', '2023-07-20', 1, 4, 25),
( '2023-07-19', '2023-07-20', 1, 1, 26),
( '2023-07-19', '2023-07-20', 1, 1, 27),
( '2023-07-19', '2023-07-20', 1, 1, 28),

( '2023-07-19', '2023-07-21', 1, 1, 24),
( '2023-07-19', '2023-07-21', 1, 1, 25),
( '2023-07-19', '2023-07-21', 1, 1, 26),
( '2023-07-19', '2023-07-21', 1, 2, 27),
( '2023-07-19', '2023-07-21', 1, 1, 28),
( '2023-07-19', '2023-07-21', 1, 3, 29),
( '2023-07-19', '2023-07-21', 1, 1, 30),
( '2023-07-19', '2023-07-21', 1, 1, 31),
( '2023-07-19', '2023-07-21', 1, 2, 32),
( '2023-07-19', '2023-07-21', 1, 1, 33),
( '2023-07-19', '2023-07-21', 1, 5, 34),
( '2023-07-19', '2023-07-21', 1, 1, 35),
( '2023-07-19', '2023-07-21', 1, 4, 36),
( '2023-07-19', '2023-07-21', 1, 1, 37),
( '2023-07-19', '2023-07-21', 1, 3, 38),
( '2023-07-19', '2023-07-21', 1, 1, 39),

( '2023-07-19', '2023-07-24', 1, 1, 24),
( '2023-07-19', '2023-07-24', 1, 1, 25),
( '2023-07-19', '2023-07-24', 1, 8, 26),
( '2023-07-19', '2023-07-24', 1, 1, 27),
( '2023-07-19', '2023-07-24', 1, 1, 28),
( '2023-07-19', '2023-07-24', 1, 4, 29),
( '2023-07-19', '2023-07-24', 1, 1, 30),
( '2023-07-19', '2023-07-24', 1, 1, 31),
( '2023-07-19', '2023-07-24', 1, 5, 32),
( '2023-07-19', '2023-07-24', 1, 6, 33),
( '2023-07-19', '2023-07-24', 1, 2, 34),
( '2023-07-19', '2023-07-24', 1, 1, 35),
( '2023-07-19', '2023-07-24', 1, 1, 36),
( '2023-07-19', '2023-07-24', 1, 1, 37),
( '2023-07-19', '2023-07-24', 1, 6, 38),
( '2023-07-19', '2023-07-24', 1, 7, 39),
( '2023-07-19', '2023-07-24', 1, 5, 40),
( '2023-07-19', '2023-07-24', 1, 4, 41),
( '2023-07-19', '2023-07-24', 1, 3, 42),
( '2023-07-19', '2023-07-24', 1, 2, 43),
( '2023-07-19', '2023-07-24', 1, 1, 44),
( '2023-07-19', '2023-07-24', 1, 1, 45),
( '2023-07-19', '2023-07-24', 1, 1, 46),

( '2023-07-20', '2023-07-24', 0, 1, 24),
( '2023-07-20', '2023-07-24', 0, 1, 25),
( '2023-07-20', '2023-07-24', 2, 8, 26),
( '2023-07-20', '2023-07-24', 3, 1, 27);


-- Requête pour consulter les jours de disponibilité d'une crèche.
-- SELECT p.name, d.day from pro AS p JOIN pro_disponibility AS pd ON p.id = pd.pro_id JOIN disponibility AS d ON d.id = pd.disponibility_id; 

SET FOREIGN_KEY_CHECKS = 1;

