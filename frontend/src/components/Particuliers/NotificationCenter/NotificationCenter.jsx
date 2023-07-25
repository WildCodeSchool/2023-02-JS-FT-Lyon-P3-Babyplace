import { useEffect, useState } from "react";
import NotificationLign from "./NotificationLign";
import styles from "./NotificationCenter.module.css";
import instance from "../../../services/APIService";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    instance
      .get(`/notifications/parents`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => console.error(err));
    return () => {
      instance
        .get(`/notifications/checked/parent`)
        .catch((err) => console.error(err));
    };
  }, []);

  return (
    <div className={styles.notifications_container}>
      <div>
        {!notifications || notifications.length === 0 ? (
          <div className={styles.nodata}>
            <p>Vous n'avez actuellement aucune notification.</p>
          </div>
        ) : null}
        {notifications.map((notification) => (
          <NotificationLign key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
