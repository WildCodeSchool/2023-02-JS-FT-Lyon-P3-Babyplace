import PropTypes from "prop-types";
import styles from "./ModalWrapper.module.css";

export default function ParentCard({
  children,
  closeModalProp,
  closeModalPropte,
}) {
  const handleModalClose = () => {
    closeModalProp(!closeModalPropte);
  };

  return (
    <div className={styles.blur_modal}>
      <div className={styles.background_box}>
        <div className={styles.modal_border}>{children}</div>
        <button
          type="button"
          className={styles.back_btn}
          onClick={handleModalClose}
        >
          fermer
        </button>
      </div>
    </div>
  );
}
ParentCard.propTypes = {
  children: PropTypes.node.isRequired, // Ajout du prop-type pour 'children'
  closeModalProp: PropTypes.func.isRequired, // Ajout du prop-type pour 'closeModalProp'
  closeModalPropte: PropTypes.bool.isRequired, // Ajout du prop-type pour 'closeModalPropte'
};
