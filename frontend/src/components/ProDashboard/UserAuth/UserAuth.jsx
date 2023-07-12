import styles from "./UserAuth.module.css";
import BgImage from "../../../assets/images/image2.png";
import ProAuthChange from "./ProAuthChange";

export default function UserAuth() {
  return (
    <div className={styles.userauth_container}>
      <div className={styles.left_container}>
        <div className={styles.userauth_box}>
          <ProAuthChange />
        </div>
      </div>
      <div className={styles.right_container}>
        <img className={styles.bg_img} src={BgImage} alt="Babyplace" />
      </div>
    </div>
  );
}
