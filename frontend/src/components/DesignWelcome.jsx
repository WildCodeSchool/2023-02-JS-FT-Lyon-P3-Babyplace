import React from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import styles from "./DesignWelcome.module.css";
import baby from "../assets/images/baby-6087761_1280.jpg";

function DesignWelcome({ home }) {
  const navigate = useNavigate();

  return (
    <div className={styles.design}>
      {home ? null : (
        <button
          type="button"
          className={styles.button_back}
          onClick={() => navigate(-1)}
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
