import Recap from "../../ProRegister/Recap";
import styles from "./ModifyData.module.css";
import FormBlock from "../../ProRegister/FormBlock";

export default function ModifyData() {
  return (
    <div className={styles.modifydata_box}>
      <Recap />
      <FormBlock />
    </div>
  );
}
