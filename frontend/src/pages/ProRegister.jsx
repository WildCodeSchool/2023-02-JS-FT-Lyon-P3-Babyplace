import React, { useState } from "react";
import FormBlock from "../components/ProRegister/FormBlock";
import Recap from "../components/ProRegister/Recap";
import styles from "./ProRegister.module.css";

export default function ProRegister() {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    mail_address: "",
    password: "",
    verifyPassword: "",
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
    {
      field: "Informations de connexion",
      type: "enter",
      data: [
        { field: "mail_address", fieldname: "Adresse mail" },
        { field: "password", fieldname: "Mot de passe" },
        { field: "verifyPassword", fieldname: "Confirmez votre mot de passe" },
      ],
    },
    {
      field: "Nom de la structure",
      type: "enter",
      data: [{ field: "name", fieldname: "Nom de la structure" }],
    },
    {
      field: "Type de structure",
      type: "select",
      data: [
        {
          field: "type",
          multiple: false,
          data: ["Micro-crèche", "Crèche associative", "Crèche publique"],
        },
      ],
    },
    {
      field: "Téléphone",
      type: "enter",
      data: [{ field: "phone_number", fieldname: "Numéro de téléphone" }],
    },
    {
      field: "Description",
      type: "enter",
      data: [{ field: "description", fieldname: "Description" }],
    },
    {
      field: "Adresse",
      type: "enter",
      data: [
        { field: "address", fieldname: "Numéro et nom de la voie" },
        { field: "postcode", fieldname: "Code postal" },
        { field: "city", fieldname: "Commune" },
      ],
    },
    {
      field: "Disponibilité",
      type: "select",
      data: [
        {
          field: "disponibility",
          multiple: true,
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
      ],
    },
    {
      field: "Nombre de places",
      type: "enter",
      data: [{ field: "places", fieldname: "Nombre de places" }],
    },
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
          fieldsToComplete={fieldsToComplete}
        />
      </div>
    </div>
  );
}
