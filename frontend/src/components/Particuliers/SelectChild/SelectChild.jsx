import React from "react";
import styles from "./SelectChild.module.css";

function SelectChild() {
  return (
    <div className={styles.selectChildScreen}>
      <div>Sélectionnez l'enfant que vous souhaitez faire garder</div>
      <div className={styles.disclaimer}>
        <p>En envoyant ma demande de réservation, j'accepte :</p>
        <p>- Le réglement intérieur de la structure</p>
        <p>
          - d'envoyer mon dossier d'inscripton et mes informations à la crèche
        </p>
      </div>
    </div>
  );
}

export default SelectChild;
