import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import styles from "./SelectChild.module.css";
import { useUserContext } from "../../../contexts/UserContext";

function SelectChild() {
  const { userChildren } = useUserContext();

  return (
    <div className={styles.selectChildScreen}>
      <Link to="/particulier">
        <button type="button" className={styles.button_back}>
          <ArrowBackIosNewIcon />
        </button>
      </Link>
      <div className={styles.title}>
        <h1>Réservation chez Picoti Picota</h1>
      </div>
      <div className={styles.card}>
        <div>Sélectionnez l'enfant que vous souhaitez faire garder :</div>
        {userChildren &&
          userChildren.map((child) => {
            return <p key={child.fisrtname}>{child.firstname}</p>;
          })}
        <div className={styles.disclaimer}>
          <p>En envoyant ma demande de réservation, j'accepte :</p>
          <p>- Le réglement intérieur de la structure</p>
          <p>
            - d'envoyer mon dossier d'inscripton et mes informations à la crèche
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectChild;
