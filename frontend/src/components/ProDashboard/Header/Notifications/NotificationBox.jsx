import { useEffect, useState } from "react";
import dayjs from "dayjs";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationBox.module.css";
import instance from "../../../../services/APIService";

export default function NotificationBox() {
  const [notifications, setNotifications] = useState([]);
  // Obtenir la date d'aujourd'hui
  const currentDate = dayjs();
  // Soustraire 7 jours pour obtenir la date d'il y a une semaine
  const previousWeekDate = currentDate.subtract(7, "day");
  // Formater la date en format "YYYY-MM-DD"
  const formattedDate = previousWeekDate.format("YYYY-MM-DD");

  useEffect(() => {
    instance
      .get(`/notifications/pro?date=${formattedDate}`) // on récupère toute les notifications (lues et non-lues)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => console.error(err));
    return () => {
      instance
        .get(`/notifications/checked/pro?date=${formattedDate}`) // au démontage du composant, on marque ces notification comme lues
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
