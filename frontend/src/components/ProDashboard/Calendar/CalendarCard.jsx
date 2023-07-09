import PropTypes from "prop-types";
import styles from "./CalendarCard.module.css";
import Walking from "../../../assets/icones/walking.png";
import NoWalking from "../../../assets/icones/no-walking.png";

export default function CalendarCard({ data }) {
  const isWalking = () => {
    if (data.walking === 0) {
      return NoWalking;
    }
    if (data.walking === 1) {
      return Walking;
    }
    return null;
  };
  console.info(data);
  return (
    <div className={styles.calendarcard_box}>
      <div className={styles.duration}>
        <p>Journée</p>
      </div>
      <div className={styles.img}>
        <img src={isWalking()} alt="Baby Walking ?" />
      </div>
      <div className={styles.name}>
        <p>
          {data.prenom_enfant} {data.nom_enfant}
        </p>
        <p className={styles.birth}>{data.anniversaire}</p>
      </div>
    </div>
  );
}

CalendarCard.propTypes = {
  data: PropTypes.shape({
    prenom_enfant: PropTypes.string.isRequired,
    nom_enfant: PropTypes.string.isRequired,
    anniversaire: PropTypes.string.isRequired,
    walking: PropTypes.bool.isRequired,
  }).isRequired,
};
