import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationBox.module.css";
import instance from "../../../../services/APIService";

export default function NotificationBox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    instance
      .get(`/notifications/pro`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => console.error(err));
    return () => {
      instance
        .get(`/notifications/checked/pro`)
        .catch((err) => console.error(err));
    };
  }, []);

  return (
    <div className={styles.notifications_container}>
      <p className={styles.div_title}>Notifications</p>
      <div>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
