import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import instance from "../../../services/APIService";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import styles from "./OrderCardParent.module.css";

function OrderCardParent({ reservation, refreshData, setRefreshData }) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [pro, setPro] = useState(null);
  const notifyCancel = (text) => toast.success(text);
  const notifyFail = () => toast.error("Un problème est survenu");
  const {
    id: idReservation,
    reservationDate: date,
    firstname: prenomEnfant,
    lastname: nomEnfant,
    proId: idPro,
    parent_firstname: parentFirstname,
    parent_lastname: parentLastname,
  } = reservation;

  const childName = `${prenomEnfant} ${nomEnfant}`;
  const parentName = `${parentFirstname} ${parentLastname}`;

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

  // Gestion du clic sur le bouton "Annuler" d'une réservation.
  const handleAction = () => {
    instance
      .put(
        `/parent/reservations/cancel/${idReservation}?date=${date}&childname=${childName}&pro=${idPro}&parentname=${parentName}`
      )
      .then((res) => {
        if (res.status === 200) {
          notifyCancel("Réservation annulée");
        } else {
          notifyFail();
        }
      })
      .catch((err) => console.error(err));
    setOpenModal(false);
    setRefreshData(!refreshData);
  };

  return (
    <>
      {openModal && !message && (
        // Affichage des données de la crèche concernée par la réservation, via le clic sur la loupe
        <ModalWrapper closeModal={setOpenModal} isCloseBtn={false}>
          <div className={styles.basic_modal_container}>
            <p className={styles.modal_text}>
              {pro ? (
                <>
                  <h2>Crèche : {pro.name}</h2>
                  <br />
                  <p>
                    <b>Adresse : </b> {pro.address} {pro.postcode} {pro.city}
                  </p>
                  <br />
                  <p>
                    <b> Téléphone : </b> {pro.phone_number}
                  </p>
                  <br />
                </>
              ) : null}
            </p>
            <button
              type="button"
              className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
              onClick={() => {
                setPro(null);
                setOpenModal(false);
                setMessage(null);
              }}
            >
              OK
            </button>
          </div>
        </ModalWrapper>
      )}
      {openModal && message && (
        // Affichage d'une modale pour confirmer l'annulation de la réservation
        <ModalWrapper closeModal={setOpenModal} isCloseBtn={false}>
          <div className={styles.basic_modal_container}>
            <p className={styles.modal_text}>{message}</p>
            <div className={styles.btn_modal_box}>
              {message === "La réservation a bien été annulée." ? (
                <button
                  type="button"
                  className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
                  onClick={() => {
                    setOpenModal(false);
                    setMessage(null);
                  }}
                >
                  OK
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styles.btn_inside_modal} ${styles.btn_for_no}`}
                    onClick={() => {
                      setOpenModal(false);
                      setMessage(null);
                    }}
                  >
                    Non
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
                    onClick={handleAction}
                  >
                    Oui
                  </button>
                </>
              )}
            </div>
          </div>
        </ModalWrapper>
      )}
      <div className={`${styles.order_container} ${getCancelledColor() || ""}`}>
        <div className={styles.status_detail_box}>
          <div
            id="horizontal_status_bar"
            className={`${styles.status_detail} ${getStatusColor() || ""}`}
          >
            {getDetailStatus()}
          </div>
        </div>
        <div className={styles.orderDetail}>
          <div className={styles.actions}>
            <div className={styles.pro_more_info}>
              <Button
                sx={{ height: 80, width: 120 }}
                onClick={() => {
                  setOpenModal(true);
                  instance
                    .get(`/pro/${reservation.proId}`)
                    .then((response) => {
                      setPro(response.data);
                    })
                    .catch(() => {
                      setPro(null);
                      setOpenModal(false);
                    });
                }}
              >
                <ZoomInIcon sx={{ height: 60, width: 120, color: "black" }} />
              </Button>
            </div>
            <div className={styles.action_box}>
              <div className={styles.btn_box}>
                {reservation.status === 1 ? (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 5, my: 1 }}
                    id="cancel"
                    onClick={() => {
                      // Gestion de l'ouverture de la modale de confirmation d'annulation
                      setMessage(
                        "Êtes-vous sûr(e) de vouloir annuler cette réservation ?"
                      );
                      setOpenModal(true);
                    }}
                  >
                    Annuler
                    <CancelOutlinedIcon />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.reservation}>
            <div className={styles.reservation_data}>
              <div className={styles.child_name}>
                <h5>
                  {reservation.firstname} {reservation.lastname}
                </h5>
              </div>
              <div className={styles.reservation_type}>
                <p className={styles.bold_text}>Date de réservation</p>
                <p>{reservation.reservationDate}</p>
              </div>
            </div>
            <div className={styles.reservation_info}>
              <div className={styles.total_time_div}>
                <p className={styles.bold_text}>Durée : </p>
                <p>Journée complète</p>
              </div>
            </div>
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
    </>
  );
}

export default OrderCardParent;

OrderCardParent.propTypes = {
  reservation: PropTypes.shape({
    proId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    parent_firstname: PropTypes.string.isRequired,
    parent_lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reservationDate: PropTypes.string.isRequired,
  }).isRequired,
  refreshData: PropTypes.bool.isRequired,
  setRefreshData: PropTypes.func.isRequired,
};
