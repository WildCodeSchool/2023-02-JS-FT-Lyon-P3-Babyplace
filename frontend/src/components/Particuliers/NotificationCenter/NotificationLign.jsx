import PropTypes from "prop-types";
import styles from "./NotificationLign.module.css";

export default function NotificationLign({ notification }) {
  const getStatusColor = () => {
    if (notification.type === "validation") {
      return styles.validation_color;
    }
    if (notification.type === "refuse") {
      return styles.refuse_color;
    }
    if (notification.type === "cancel") {
      return styles.cancel_color;
    }
    return null;
  };
  const getNewBadge = () => {
    if (notification.status === 0) {
      return styles.new_badge;
    }
    if (notification.status === 1) {
      return styles.display_none_class;
    }
    return null;
  };
  return (
    <div className={styles.notificationlign_container}>
      <div className={`${styles.status_color} ${getStatusColor() || ""}`} />
      <div className={styles.is_new_badge}>
        <div className={`${getNewBadge()}`} />
      </div>
      <div className={styles.text_section}>
        <p>{notification.description}</p>
      </div>
    </div>
  );
}

NotificationLign.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
