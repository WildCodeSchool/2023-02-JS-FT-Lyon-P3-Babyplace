import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import instance from "../../../services/APIService";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import styles from "./OrderCardParent.module.css";

function OrderCardParent({ reservation }) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  // const [orderId, setOrderId] = useState(null);

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

  const handleAction = () => {
    instance
      .patch("/parent/reservation", { id: reservation.id })
      .then((res) => {
        if (res.status === 200) {
          setMessage("La réservation a bien été annulée.");
        }
        console.info(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {openModal && !message && (
        <ModalWrapper closeModal={setOpenModal} isCloseBtn={false}>
          <div className={styles.basic_modal_container}>
            <p className={styles.modal_text}>Bla bla bla</p>
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
          </div>
        </ModalWrapper>
      )}
      {openModal && message && (
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
                    onClick={() => setOpenModal(false)}
                  >
                    Non
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
                    onClick={() => handleAction()}
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
    id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reservationDate: PropTypes.string.isRequired,
  }).isRequired,
};
