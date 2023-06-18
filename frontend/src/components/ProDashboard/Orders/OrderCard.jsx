import PropTypes from "prop-types";
import styles from "./OrderCard.module.css";

export default function OrderCard({ reservation }) {
  return (
    <div className={styles.ordercard_box}>
      <h1>{reservation.id}</h1>
      <h1>{reservation.name}</h1>
      <h1>{reservation.statusInfo}</h1>
    </div>
  );
}

OrderCard.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    statusInfo: PropTypes.string.isRequired,
  }).isRequired,
};
