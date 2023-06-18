import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./Orders.module.css";
import OrderCard from "./OrderCard";

export default function Orders() {
  const reservations = [
    {
      id: 1,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 3,
      statusInfo: "annulé",
    },
    {
      id: 2,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 0,
      statusInfo: "En attente",
    },
    {
      id: 3,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 1,
      statusInfo: "Accepté",
    },
    {
      id: 4,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 2,
      statusInfo: "Refusé",
    },
    {
      id: 5,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 2,
      statusInfo: "Refusé",
    },
    {
      id: 6,
      name: "Bébé Cannan",
      age: "18 mois",
      parent: "Ed Cannan",
      parentProfile: "Profil 100%",
      type: "Papa Poule",
      dateArrive: "23 sept / 7:00",
      dateRetour: "23 sept / 17:00",
      nbHeures: 10,
      status: 1,
      statusInfo: "Accepté",
    },
  ];

  const [selectedValue, setSelectedValue] = useState(4);

  const handleSelect = (e) => {
    setSelectedValue(e.target.id);
  };

  const filterOrder = (res) => {
    if (parseInt(selectedValue, 10) === 4) {
      return 4;
    }
    if (parseInt(res.status, 10) === 0) {
      return 0;
    }
    if (parseInt(res.status, 10) === 1) {
      return 1;
    }
    if (parseInt(res.status, 10) === 2) {
      return 2;
    }
    if (parseInt(res.status, 10) === 3) {
      return 3;
    }
    return null;
  };

  const filteredOrders = reservations.filter(
    (reservation) => filterOrder(reservation) === parseInt(selectedValue, 10)
  );

  return (
    <div className={styles.orders_box}>
      <div className={styles.orders_header}>
        <h3>Toutes les réservations</h3>
        <div className={styles.filter_btn_box}>
          <Button
            id="4"
            variant="contained"
            onClick={handleSelect}
            sx={{ marginRight: 5, marginLeft: 5 }}
          >
            Toutes
          </Button>
          <Button
            id="0"
            variant="outlined"
            onClick={handleSelect}
            color="primary"
            sx={{ mx: 1 }}
          >
            En attente
          </Button>
          <Button
            id="1"
            variant="outlined"
            onClick={handleSelect}
            color="success"
            sx={{ mx: 1 }}
          >
            Acceptées
          </Button>
          <Button
            id="2"
            variant="outlined"
            onClick={handleSelect}
            color="error"
            sx={{ mx: 1 }}
          >
            Refusées
          </Button>
          <Button
            id="3"
            variant="outlined"
            onClick={handleSelect}
            color="warning"
            sx={{ mx: 1 }}
          >
            Annulées
          </Button>
        </div>
      </div>
      <div className={styles.orders_container}>
        {filteredOrders.map((reservation) => (
          <OrderCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
