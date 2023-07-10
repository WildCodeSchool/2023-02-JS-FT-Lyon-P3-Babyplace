import PropTypes from "prop-types";
import styles from "./BasicModal.module.css";

export default function BasicModal({
  closeModal,
  modalText,
  actionNoButton,
  actionYesButton,
}) {
  const handleModalClose = () => {
    closeModal(false);
    actionNoButton();
  };
  const handleAction = () => {
    closeModal(false);
    actionYesButton();
  };

  return (
    <div className={styles.basic_modal_container}>
      <p className={styles.modal_text}>{modalText}</p>
      <div className={styles.btn_modal_box}>
        <button
          type="button"
          className={`${styles.btn_inside_modal} ${styles.btn_for_no}`}
          onClick={handleModalClose}
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
      </div>
    </div>
  );
}

BasicModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalText: PropTypes.string.isRequired,
  actionNoButton: PropTypes.func.isRequired,
  actionYesButton: PropTypes.func.isRequired,
};
