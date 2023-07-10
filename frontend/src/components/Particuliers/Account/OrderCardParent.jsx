import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import styles from "./OrderCardParent.module.css";

function OrderCardParent({ reservation }) {
  const [openModal, setOpenModal] = useState(false);
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

  const handleCancel = () => {
    console.info("nope");
  };

  return (
    <>
      {openModal && (
        <ModalWrapper closeModal={setOpenModal} isCloseBtn={false}>
          <div>Test</div>
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
                onClick={() => console.info("click")}
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
                    onClick={handleCancel}
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
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reservationDate: PropTypes.string.isRequired,
  }).isRequired,
};
