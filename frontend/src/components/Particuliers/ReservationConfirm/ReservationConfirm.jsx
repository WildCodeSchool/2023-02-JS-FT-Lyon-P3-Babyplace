import React, { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useNavigate } from "react-router-dom";
import rainbow from "../../../assets/images/rainbow.png";
import { useReservationContext } from "../../../contexts/ReservationContext";
import styles from "./ReservationConfirm.module.css";

function ReservationConfirm() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservationContext();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const day = reservation.date.toLocaleString("fr-FR", options);

  useEffect(() => {
    return () => setReservation({});
  }, []);

  return (
    <div className={styles.container}>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={400}
        recycle={false}
      />
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
              // On réinitialise le state réservation et on retourne au menu compte
              // lorsque la réservation est effectuée et qu'on clique sur le bouton
              setReservation({});
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
