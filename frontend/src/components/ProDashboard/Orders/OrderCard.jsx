import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import styles from "./OrderCard.module.css";

export default function OrderCard({ reservation }) {
  return (
    <div className={styles.ordercard_box}>
      <div className={styles.order_container}>
        <div className={styles.status_bar} />
        <div className={styles.child_data}>
          <div className={styles.child_name_box}>
            <h4>{reservation.name}</h4>
            <p>{reservation.age}</p>
          </div>
          <div className={styles.child_more_info}>
            <Button sx={{ height: 80, width: 120 }}>
              <ZoomInIcon sx={{ height: 60, width: 120, color: "black" }} />
            </Button>
          </div>
        </div>
        <div className={styles.reservation}>
          <div className={styles.reservation_data}>
            <div className={styles.parent_name}>
              <h5>{reservation.parent}</h5>
              <p>Profil 100%</p>
            </div>
            <div className={styles.parent_type}>Papa Poule</div>
            <div className={styles.status_detail}>{reservation.statusInfo}</div>
          </div>
          <div className={styles.reservation_info}>
            <div className={styles.comming_div}>
              <p>Date d'arrivée</p>
              <p>{reservation.dateArrive}</p>
            </div>
            <div className={styles.finish_div}>
              <p>Date de départ</p>
              <p>{reservation.dateRetour}</p>
            </div>
            <div className={styles.total_time_div}>
              <p>Nombre d'heure</p>
              <p>{`${reservation.nbHeures}h`}</p>
            </div>
          </div>
        </div>
        <div className={styles.action_box}>
          <div className={styles.about_child}>
            <p>Profil complet</p>
            <p>Enfant déjà gardé</p>
          </div>
          <div className={styles.btn_box}>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 5, my: 1 }}
            >
              Accepter
              <TaskAltOutlinedIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: 5, my: 1 }}
            >
              Refuser
              <CancelOutlinedIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    parent: PropTypes.string.isRequired,
    dateArrive: PropTypes.string.isRequired,
    dateRetour: PropTypes.string.isRequired,
    nbHeures: PropTypes.number.isRequired,
    statusInfo: PropTypes.string.isRequired,
  }).isRequired,
};
