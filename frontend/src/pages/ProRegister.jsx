import React, { useState } from "react";
import FormBlock from "../components/ProRegister/FormBlock";
import Recap from "../components/ProRegister/Recap";
import styles from "./ProRegister.module.css";

export default function ProRegister() {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    mail_address: "",
    address: "",
    postcode: 1,
    city: "",
    phone_number: null,
    description: "",
    type: "",
    disponibility: [],
    places: null,
  });

  const [activeField, setActiveField] = useState(null);
  const fieldsToComplete = [
    { field: "Nom de la structure", data: ["name"] },
    { field: "Type de structure", data: ["type"] },
    { field: "Téléphone", data: ["phone_number"] },
    { field: "Description", data: ["description"] },
    {
      field: "Adresse",
      data: [
        { field: "address", fieldname: "Numéro et nom de la voie" },
        { field: "postcode", fieldname: "Code postal" },
        { field: "city", fieldname: "Commune" },
      ],
    },
    {
      field: "Disponibilité",
      data: [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ],
    },
    { field: "Nombre de places", data: ["places"] },
  ];

  return (
    <div className={styles.registerPage}>
      <div className={styles.header}>
        <h1>Babyplace</h1>
      </div>
      <div className={styles.formDisplay}>
        <Recap
          registerInfo={registerInfo}
          fieldsToComplete={fieldsToComplete}
          activeField={activeField}
          setActiveField={setActiveField}
        />
        <FormBlock
          activeField={activeField}
          setActiveField={setActiveField}
          registerInfo={registerInfo}
          setRegisterInfo={setRegisterInfo}
        />
      </div>
    </div>
  );
}
