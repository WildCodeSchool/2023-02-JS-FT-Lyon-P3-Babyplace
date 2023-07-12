import styles from "./WelcomeBox.module.css";
import LeftDecoration from "../../../../../assets/images/decore-left.png";
import RightDecoration from "../../../../../assets/images/decore-right.png";
import Award from "../../../../../assets/images/award.png";
import { useUserContext } from "../../../../../contexts/UserContext";

export default function Chart1() {
  const { user } = useUserContext();
  return (
    <div className={styles.chart1_container}>
      <img
        className={styles.left_decoration}
        src={LeftDecoration}
        alt="left-decoration"
      />
      <img
        className={styles.right_decoration}
        src={RightDecoration}
        alt="right-decoration"
      />
      <div className={styles.img_box}>
        <img className={styles.img} src={Award} alt="Award-logo" />
      </div>
      <h3 className={styles.name}>Bienvenue {user.name}</h3>
      <p className={styles.text}>Vous êtes sur votre espace professionnel.</p>
    </div>
  );
}
