import styles from "./CalendarInfo.module.css";

export default function CalendarInfo() {
  return (
    <div className={styles.calendar_info_box}>
      <h1 className={styles.title}>Agenda</h1>
      <div className={styles.info_container}>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.green}`} />
          <p className={styles.text_info}>
            Il reste plus de la moitié des places disponible
          </p>
        </div>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.orange}`} />
          <p className={styles.text_info}>
            Il reste moins de la moitié des places disponible
          </p>
        </div>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.red}`} />
          <p className={styles.text_info}>Il ne reste plus de places !</p>
        </div>
      </div>
    </div>
  );
}
