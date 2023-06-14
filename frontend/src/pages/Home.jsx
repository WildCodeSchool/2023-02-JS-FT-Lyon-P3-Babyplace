import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./Home.module.css";
import baby from "../assets/images/baby-6087761_1280.jpg";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.design}>
        <h1>Babyplace</h1>
        <h2>Faites garder vos enfants par des professionnels.</h2>
        <img src={baby} alt="baby playing" />
      </div>
      <div className={styles.redirectWindow}>
        <div className={styles.pro}>
          <p>Je suis un professionnel : </p>
          <Link to="/pro">
            <Button variant="contained">Accéder au site pro</Button>
          </Link>
        </div>
        <div className={styles.particuliers}>
          <p>Je suis un particulier : </p>
          <Link to="/particuliers">
            <Button variant="contained">Accéder au site particuliers</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
