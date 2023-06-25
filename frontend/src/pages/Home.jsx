import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DesignWelcome from "../components/DesignWelcome";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <DesignWelcome home />
      <div className={styles.redirectWindow}>
        <div className={styles.pro}>
          <p>Je suis un professionnel : </p>
          <Link to="/pro">
            <Button variant="contained">Accéder au site pro</Button>
          </Link>
        </div>
        <div className={styles.particuliers}>
          <p>Je suis un particulier : </p>
          <Link to="/particulier/recherche">
            <Button variant="contained">Accéder au site particuliers</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
