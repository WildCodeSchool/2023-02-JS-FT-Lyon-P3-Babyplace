import React from "react";
import { useNavigate } from "react-router-dom";
import rainbow from "../../../assets/images/rainbow.png";
import { useReservationContext } from "../../../contexts/ReservationContext";
import styles from "./ReservationConfirm.module.css";

function ReservationConfirm() {
  const navigate = useNavigate();
  const { reservation } = useReservationContext();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const day = reservation.date.toLocaleString("fr-FR", options);
  return (
    <div className={styles.container}>
      <div className={styles.confirmScreen}>
        <div className={styles.upperBox}>
          <img
            src={rainbow}
            className={styles.image}
            alt="arc-en-ciel dessiné"
          />
        </div>
        <div className={styles.lowerBox}>
          <h1 className={styles.congrats}>Fantastique !</h1>
          <p>
            La crèche {reservation.proName} prendra prochainement connaissance
            de votre demande de réservation pour :
          </p>
          <div className={styles.details}>
            <p className={styles.info}>l'enfant {reservation.childName}</p>
            <p className={styles.info}>le {day}</p>
          </div>
          <h2>Celle-ci est actuellement en attente, et doit être confirmée.</h2>
          <h3>
            Vérifiez vos notifications dans les prochaines heures afin de
            consulter l'évolution de son statut.
          </h3>
        </div>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              navigate("/particulier");
            }}
          >
            D'accord
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationConfirm;
