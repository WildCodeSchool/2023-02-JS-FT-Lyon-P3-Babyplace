import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./OrdersParent.module.css";
import OrderCardParent from "./OrderCardParent";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";

function Orders({ setAccountScreen }) {
  const [data, setData] = useState(null);
  const { logout } = useUserContext();

  useEffect(() => {
    // On récupère les réservation du parent dès l'ouverture de l'écran "Réservations"
    instance
      .get("/parent/reservations")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          logout(true);
        }
      });
  }, []);
  return (
    <div>
      <div className={styles.banner}>
        <button
          type="button"
          className={styles.button_back}
          onClick={() => setAccountScreen("menu")}
        >
          <ArrowBackIosNewIcon />
        </button>
        <p>Réservations</p>
      </div>
      <div className={styles.ordersList}>
        {data &&
          data.map((reservation) => {
            return <OrderCardParent reservation={reservation} />;
          })}
      </div>
    </div>
  );
}

export default Orders;

Orders.propTypes = {
  setAccountScreen: PropTypes.func.isRequired,
};
