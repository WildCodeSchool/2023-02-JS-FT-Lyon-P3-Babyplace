import styles from "./CalendarInfo.module.css";

export default function CalendarInfo() {
  return (
    <div className={styles.calendar_info_box}>
      <h1 className={styles.title}>Agenda</h1>
      <div className={styles.info_container}>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.green}`} />
          <p className={styles.text_info}>Il reste des places</p>
        </div>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.orange}`} />{" "}
          <p className={styles.text_info}>Il reste quelques places</p>
        </div>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.red}`} />{" "}
          <p className={styles.text_info}>C'est plein !</p>
        </div>
        <div className={styles.info_box}>
          <span className={`${styles.circle_color} ${styles.grey}`} />{" "}
          <p className={styles.text_info}>Jours OFF</p>
        </div>
      </div>
    </div>
  );
}
