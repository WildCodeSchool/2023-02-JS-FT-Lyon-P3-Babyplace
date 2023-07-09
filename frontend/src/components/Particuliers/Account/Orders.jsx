import React from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountHeader from "./AccountHeader";
import styles from "./Orders.module.css";

function Orders({ setAccountScreen }) {
  return (
    <div>
      <AccountHeader />
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
    </div>
  );
}

export default Orders;

Orders.propTypes = {
  setAccountScreen: PropTypes.func.isRequired,
};
