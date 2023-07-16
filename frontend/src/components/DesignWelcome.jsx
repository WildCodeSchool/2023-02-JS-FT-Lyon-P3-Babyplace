import React from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./DesignWelcome.module.css";
import baby from "../assets/images/baby-6087761_1280.jpg";

function DesignWelcome({ home }) {
  const navigate = useNavigate();
  const { pendingReservation, setPendingReservation } = useUserContext();

  return (
    <div className={styles.design}>
      {home ? null : (
        <button
          type="button"
          className={styles.button_back}
          onClick={() => {
            if (pendingReservation) {
              navigate(`/particulier/recherche/${pendingReservation}/date`);
              setPendingReservation(null);
            } else {
              navigate("/");
            }
          }}
        >
          <ArrowBackIosNewIcon />
        </button>
      )}

      <h1>Babyplace</h1>
      <h2>Faites garder vos enfants par des professionnels.</h2>
      <img src={baby} alt="baby playing" />
    </div>
  );
}

export default DesignWelcome;

DesignWelcome.propTypes = {
  home: PropTypes.bool.isRequired,
};
