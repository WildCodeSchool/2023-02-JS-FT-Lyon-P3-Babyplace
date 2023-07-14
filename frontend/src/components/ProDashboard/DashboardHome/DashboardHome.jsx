import { useState } from "react";
import styles from "./DashboardHome.module.css";
import WelcomeBox from "./InsideHome/WelcomeBox/WelcomeBox";
import DayResume from "./InsideHome/DayResume/DayResume";
import OccupationChart from "./InsideHome/OccupationChart/OccupationChart";
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
        <WelcomeBox />
      </div>
      <div className={styles.second_chart_container}>
        <DayResume />
      </div>
      <div className={styles.diagram_container}>
        <OccupationChart />
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
