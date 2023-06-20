import PropTypes from "prop-types";
import styles from "./ParentCard.module.css";
import { useModalContext } from "../../../contexts/ModalContext";
import ParentHomeFolderInfo from "./ParentHomeFolderInfo";

export default function ParentCard({ reservation }) {
  const { openModal, setOpenModal } = useModalContext();

  const handleModalClose = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className={styles.parentcard_box}>
      <div className={styles.modal_border}>
        <ParentHomeFolderInfo reservation={reservation} />
      </div>
      <button
        type="button"
        className={styles.back_btn}
        onClick={handleModalClose}
      >
        fermer
      </button>
    </div>
  );
}
ParentCard.propTypes = {
  reservation: PropTypes.shape.isRequired,
};
