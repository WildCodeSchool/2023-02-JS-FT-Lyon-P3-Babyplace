import { useEffect, useState } from "react";
import dayjs from "dayjs";
import NotificationLign from "./NotificationLign";
import styles from "./NotificationCenter.module.css";
import instance from "../../../services/APIService";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  // Obtenir la date d'aujourd'hui
  const currentDate = dayjs();
  // Soustraire 7 jours pour obtenir la date d'il y a une semaine
  const previousWeekDate = currentDate.subtract(7, "day");
  // Formater la date en format "YYYY-MM-DD"
  const formattedDate = previousWeekDate.format("YYYY-MM-DD");

  useEffect(() => {
    instance
      .get(`/notifications/parents?date=${formattedDate}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => console.error(err));
    return () => {
      instance
        .get(`/notifications/checked/parent?date=${formattedDate}`)
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
