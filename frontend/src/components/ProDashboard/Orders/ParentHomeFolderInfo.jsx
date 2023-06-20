import PropTypes from "prop-types";
import styles from "./ParentHomeFolderInfo.module.css";
import ParentPicture from "../../../assets/ed-cannan.png";

export default function ParentHomeFolderInfo({ reservation }) {
  return (
    <div className={styles.parent_home_folder_info_box}>
      <div className={styles.img_box}>
        <img className={styles.img_style} src={ParentPicture} alt="Ed Cannan" />
      </div>
      <div className={styles.name_box}>
        <h4>Ed Cannan</h4>
        <p>Papa Poule</p>
      </div>
      <div className={styles.info_box}>
        <h5>Coordonnées du parent</h5>
        <p>14 rue du Cookie de France, 69240 Lyon</p>
        <p>Tel : 06 25 14 75 65</p>
        <p>Mail : ed.cannan@gmail.com</p>
        <h5>Données de l'enfant</h5>
        <p>Bébé Cannan</p>
        <p>16 mois</p>
        <p>Marcheur</p>
        <p>{reservation.prenom_parent}</p>
      </div>
    </div>
  );
}

ParentHomeFolderInfo.propTypes = {
  reservation: PropTypes.shape({
    prenom_parent: PropTypes.string.isRequired,
    nom_parent: PropTypes.string.isRequired,
  }).isRequired,
};
