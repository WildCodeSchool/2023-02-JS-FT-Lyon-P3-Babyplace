import styles from "./UserAuth.module.css";
import BgImage from "../../../assets/images/image2.png";

export default function UserAuth() {
  return (
    <div className={styles.userauth_container}>
      <div className={styles.left_container}>
        <div className={styles.userauth_box} />
      </div>
      <div className={styles.right_container}>
        <img className={styles.bg_img} src={BgImage} alt="Babyplace" />
      </div>
    </div>
  );
}
