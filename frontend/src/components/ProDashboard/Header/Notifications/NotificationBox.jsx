import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import styles from "./NotificationBox.module.css";

export default function NotificationBox() {
  useEffect(() => {
    console.info("je monte mon composant");

    return () => {
      console.info("je démonte mon composant");
    };
  }, []);

  const [notifications] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]);
  return (
    <div className={styles.notifications_container}>
      <p className={styles.div_title}>Notifications</p>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} />
      ))}
    </div>
  );
}
