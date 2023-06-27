import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import FormBlock from "../components/ProRegister/FormBlock";
import Recap from "../components/ProRegister/Recap";
import styles from "./ProRegister.module.css";

export default function ProRegister() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    mail_address: "",
    password: "",
    verifyPassword: "",
    address: "",
    postcode: "",
    city: "",
    phone_number: null,
    description: "",
    type: "",
    disponibility: "",
    places: null,
  });

  return (
    <div className={styles.registerPage}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.button_back}
          onClick={() => navigate(-1)}
        >
          {" "}
          <ArrowBackIosNewIcon />
        </button>
        <h1>Babyplace</h1>
      </div>
      <div className={styles.formDisplay}>
        <Recap registerInfo={registerInfo} />
        <FormBlock
          registerInfo={registerInfo}
          setRegisterInfo={setRegisterInfo}
        />
      </div>
    </div>
  );
}
