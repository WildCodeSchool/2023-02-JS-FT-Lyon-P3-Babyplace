import PropTypes from "prop-types";
import styles from "./ModalWrapper.module.css";
import Close from "./close.png";

export default function ModalWrapper({ children, closeModal, isCloseBtn }) {
  const handleModalClose = () => {
    closeModal(false);
  };

  return (
    <div className={styles.blur_modal}>
      <div className={styles.background_box}>
        <div className={styles.modal_border}>{children}</div>
        {isCloseBtn ? (
          <button
            type="button"
            className={styles.back_btn}
            onClick={handleModalClose}
          >
            <img src={Close} className={styles.close_img} alt="close" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  isCloseBtn: PropTypes.bool.isRequired,
};
