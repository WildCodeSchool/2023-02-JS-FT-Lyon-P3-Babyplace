import PropTypes from "prop-types";
import styles from "./CalendarCard.module.css";

export default function CalendarCard({ data }) {
  return (
    <div className={styles.calendarcard_box}>
      <p>
        {data.prenom_enfant} {data.nom_enfant}
      </p>
    </div>
  );
}

CalendarCard.propTypes = {
  data: PropTypes.shape({
    prenom_enfant: PropTypes.string.isRequired,
    nom_enfant: PropTypes.string.isRequired,
  }).isRequired,
};
