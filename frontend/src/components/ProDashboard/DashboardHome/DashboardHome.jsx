import { useState } from "react";
import styles from "./DashboardHome.module.css";
import Chart1 from "./InsideHome/Chart1/Chart1";
import Chart2 from "./InsideHome/Chart2/Chart2";
import Chart3 from "./InsideHome/Chart3/Chart3";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import Preview from "./InsideHome/Preview/Preview";

export default function DashboardHome() {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(true);
  };
  return (
    <div className={styles.dashboardhome_box}>
      <div className={styles.first_chart_container}>
        <Chart1 />
      </div>
      <div className={styles.second_chart_container}>
        <Chart2 />
      </div>
      <div className={styles.diagram_container}>
        <Chart3 />
      </div>
      <div className={styles.preview_box}>
        <button
          type="button"
          className={styles.preview_btn}
          onClick={handleModal}
        >
          <div className={styles.preview_img}>
            <p className={styles.preview_title}>Prévisualiser mon annonce</p>
          </div>
        </button>
      </div>
      {openModal && (
        <ModalWrapper closeModal={setOpenModal} isCloseBtn>
          <div className={styles.preview_bridge}>
            <Preview />
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
