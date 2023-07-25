import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationBox.module.css";
import instance from "../../../../services/APIService";

export default function NotificationBox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    instance
      .get(`/notifications/pro`) // on récupère toute les notifications (lues et non-lues)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => console.error(err));
    return () => {
      instance
        .get(`/notifications/checked/pro`) // au démontage du composant, on marque ces notification comme lues
        .catch((err) => console.error(err));
    };
  }, []);

  return (
    <div className={styles.notifications_container}>
      <p className={styles.div_title}>Notifications</p>
      <div>
        {!notifications || notifications.length === 0 ? (
          <div className={styles.nodata}>
            <p>Vous n'avez actuellement aucune notification.</p>
          </div>
        ) : null}
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
