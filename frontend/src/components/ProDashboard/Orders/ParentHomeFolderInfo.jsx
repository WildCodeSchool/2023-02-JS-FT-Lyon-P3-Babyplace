import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ParentHomeFolderInfo.module.css";
import ParentPicture from "../../../assets/ed-cannan.png";
import instance from "../../../services/APIService";

export default function ParentHomeFolderInfo({ orderId, closeModal }) {
  const [orderInfo, setOrderInfo] = useState([]);
  const handleModalClose = () => {
    closeModal(false);
  };

  useEffect(() => {
    instance
      .get(`/dashboard/reservations/${orderId}`)
      .then((res) => {
        setOrderInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.center_div}>
      <div className={styles.parent_home_folder_info_box}>
        <div className={styles.img_box}>
          <img
            className={styles.img_style}
            src={ParentPicture}
            alt={`${orderInfo.prenom_parent} ${orderInfo.nom_parent}`}
          />
        </div>
        <div className={styles.name_box}>
          <h4>
            {orderInfo.prenom_parent} {orderInfo.nom_parent}
          </h4>
          <p>Papa Poule</p>
        </div>
        <div className={styles.info_box}>
          <h5>Coordonnées du parent</h5>
          <p>
            {orderInfo.adresse} {orderInfo.postcode} {orderInfo.city}
          </p>
          <p>Tel : {orderInfo.telephone}</p>
          <p>Mail : {orderInfo.email}</p>
          <h5>Données de l'enfant</h5>
          <p>
            {orderInfo.prenom_enfant} {orderInfo.nom_enfant}
          </p>
          <p>{orderInfo.anniversaire}</p>
          <p>{orderInfo.walking ? "Marcheur" : "Non marcheur"}</p>
        </div>
      </div>
      <button
        type="button"
        className={styles.close_btn}
        onClick={handleModalClose}
      >
        Fermer
      </button>
    </div>
  );
}

ParentHomeFolderInfo.propTypes = {
  orderId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
