import styles from "./NotificationCard.module.css";

export default function NotificationCard() {
  return (
    <div className={styles.notificationcard_container}>
      <div className={styles.status_color} />
      <div className={styles.text_section}>
        <p>BabyWild à accepté votre réservation du 13/07/23</p>
      </div>
    </div>
  );
}
