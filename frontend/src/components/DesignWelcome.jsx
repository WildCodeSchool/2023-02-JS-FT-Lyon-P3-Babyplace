import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import styles from "./DesignWelcome.module.css";
import baby from "../assets/images/baby-6087761_1280.jpg";

function DesignWelcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.design}>
      <button
        type="button"
        className={styles.button_back}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon />
      </button>

      <h1>Babyplace</h1>
      <h2>Faites garder vos enfants par des professionnels.</h2>
      <img src={baby} alt="baby playing" />
    </div>
  );
}

export default DesignWelcome;
