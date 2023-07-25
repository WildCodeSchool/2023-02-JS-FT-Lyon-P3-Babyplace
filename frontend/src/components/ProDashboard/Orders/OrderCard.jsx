import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import ParentHomeFolderInfo from "./ParentHomeFolderInfo";
import styles from "./OrderCard.module.css";
import instance from "../../../services/APIService";

export default function OrderCard({
  reservation,
  refreshData,
  setRefreshData,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const {
    id,
    date_reservation: date,
    prenom_enfant: prenomEnfant,
    nom_enfant: nomEnfant,
    id_parent: idParent,
  } = reservation;

  const childName = `${prenomEnfant} ${nomEnfant}`;

  const notifySuccess = (text) => toast.success(text);
  const notifyFail = () => toast.error("Un problème est survenu");

  // les deux fonctions suivante servent à afficher les couleurs en fonction du statut de la réservation
  const getDetailStatus = () => {
    if (reservation.status === 0) {
      return "En attente";
    }
    if (reservation.status === 1) {
      return "Acceptée";
    }
    if (reservation.status === 2) {
      return "Refusée";
    }
    if (reservation.status === 3) {
      return "Annulée";
    }
    return null;
  };
  const getStatusColor = () => {
    if (reservation.status === 0) {
      return styles.waiting_color;
    }
    if (reservation.status === 1) {
      return styles.success_color;
    }
    if (reservation.status === 2) {
      return styles.error_color;
    }
    if (reservation.status === 3) {
      return styles.warning_color;
    }
    return null;
  };
  const getCancelledColor = () => {
    if (reservation.status === 3) {
      return styles.order_cancelled;
    }
    return null;
  };

  // on ouvre la modal d'info en donnant l'id de la réservation sur laquelle on clique pour récupérer les bonnes infos
  const handleModalOpen = () => {
    setOrderId(id);
    setOpenModal(true);
  };

  // les fonctions suivante servent à accepter, refuser ou bien annuler une réservation (en fonction de son statut actuel)
  const handleValidate = () => {
    instance
      .put(
        `/dashboard/reservations/validate/${id}?date=${date}&name=${childName}&parent=${idParent}`
      )
      .then((res) => {
        if (res.status === 200) {
          notifySuccess("Réservation acceptée");
        } else {
          notifyFail();
        }
      })
      .catch((err) => console.error(err));
    setRefreshData(!refreshData);
  };
  const handleCancel = () => {
    if (reservation.status === 0) {
      instance
        .put(
          `/dashboard/reservations/refuse/${id}?date=${date}&name=${childName}&parent=${idParent}`
        )
        .then((res) => {
          if (res.status === 200) {
            notifySuccess("Réservation refusée");
          } else {
            notifyFail();
          }
        })
        .catch((err) => console.error(err));
      setRefreshData(!refreshData);
    } else if (reservation.status === 1) {
      instance
        .put(
          `/dashboard/reservations/cancel/${id}?date=${date}&name=${childName}&parent=${idParent}`
        )
        .then((res) => {
          if (res.status === 200) {
            notifySuccess("Réservation annulée");
          } else {
            notifyFail();
          }
        })
        .catch((err) => console.error(err));
      setRefreshData(!refreshData);
    }
  };

  return (
    <>
      {openModal && (
        <ModalWrapper closeModal={setOpenModal} isCloseBtn={false}>
          <ParentHomeFolderInfo orderId={orderId} closeModal={setOpenModal} />
        </ModalWrapper>
      )}
      <div className={styles.ordercard_box}>
        <div
          className={`${styles.order_container} ${getCancelledColor() || ""}`}
        >
          <div
            id="vertical_status_bar"
            className={`${styles.status_bar} ${getStatusColor() || ""}`}
          />
          <div className={styles.child_data}>
            <div className={styles.child_name_box}>
              <h4>
                {reservation.prenom_enfant} {reservation.nom_enfant}
              </h4>
            </div>
            <div className={styles.child_more_info}>
              <Button sx={{ height: 80, width: 120 }} onClick={handleModalOpen}>
                <ZoomInIcon sx={{ height: 60, width: 120, color: "black" }} />
              </Button>
            </div>
          </div>
          <div className={styles.reservation}>
            <div className={styles.reservation_data}>
              <div className={styles.parent_name}>
                <h5>
                  {reservation.prenom_parent} {reservation.nom_parent}
                </h5>
                <p>Profil 100%</p>
              </div>
              <div className={styles.parent_type}>
                <p className={styles.bold_text}>Date de réservation</p>
                <p>{reservation.date_enregistrement}</p>
              </div>
              <div className={styles.status_detail_box}>
                <div
                  id="horizontal_status_bar"
                  className={`${styles.status_detail} ${
                    getStatusColor() || ""
                  }`}
                >
                  {getDetailStatus()}
                </div>
              </div>
            </div>
            <div className={styles.reservation_info}>
              <div className={styles.comming_div}>
                <p className={styles.bold_text}>Date d'arrivée</p>
                <p>{reservation.date_reservation}</p>
              </div>
              <div className={styles.finish_div}>
                <p className={styles.bold_text}>Date de départ</p>
                <p>{reservation.date_reservation}</p>
              </div>
              <div className={styles.total_time_div}>
                <p className={styles.bold_text}>Durée</p>
                <p>Journée complète</p>
              </div>
            </div>
          </div>
          <div className={styles.action_box}>
            <div className={styles.btn_box}>
              {reservation.status === 1 ||
              reservation.status === 2 ||
              reservation.status === 3 ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: 5, my: 1 }}
                  onClick={handleValidate}
                >
                  Accepter
                  <TaskAltOutlinedIcon />
                </Button>
              )}
              {reservation.status === 2 || reservation.status === 3 ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: 5, my: 1 }}
                  id="cancel"
                  onClick={handleCancel}
                >
                  {reservation.status === 1 ? "Annuler" : "Refuser"}
                  <CancelOutlinedIcon />
                </Button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

OrderCard.propTypes = {
  reservation: PropTypes.shape({
    prenom_enfant: PropTypes.string.isRequired,
    nom_enfant: PropTypes.string.isRequired,
    prenom_parent: PropTypes.string.isRequired,
    nom_parent: PropTypes.string.isRequired,
    date_enregistrement: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    id_parent: PropTypes.number.isRequired,
    date_reservation: PropTypes.string.isRequired,
  }).isRequired,
  refreshData: PropTypes.bool.isRequired,
  setRefreshData: PropTypes.func.isRequired,
};
