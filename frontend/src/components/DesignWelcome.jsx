import React from "react";
import styles from "./DesignWelcome.module.css";
import baby from "../assets/images/baby-6087761_1280.jpg";

function DesignWelcome() {
  return (
    <div className={styles.design}>
      <h1>Babyplace</h1>
      <h2>Faites garder vos enfants par des professionnels.</h2>
      <img src={baby} alt="baby playing" />
    </div>
  );
}

export default DesignWelcome;
