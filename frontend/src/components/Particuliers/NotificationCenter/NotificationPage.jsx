import styles from "./NotificationPage.module.css";
import NotificationCenter from "./NotificationCenter";

export default function NotificationPage() {
  return (
    <div className={styles.notificationpage_container}>
      <h1>Centre de notifications</h1>
      <div className={styles.notification_box}>
        <div className={styles.notification_container}>
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}
