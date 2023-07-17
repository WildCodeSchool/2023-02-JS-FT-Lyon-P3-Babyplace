import React, { useState } from "react";
import Recap from "../../ProRegister/Recap";
import styles from "./ModifyData.module.css";
import FormBlock from "../../ProRegister/FormBlock";

export default function ModifyData() {
  const fieldsToComplete = [
    {
      field: "Informations de connexion",
      data: [
        { field: "mail_address", fieldname: "Adresse mail" },
        { field: "password", fieldname: "Mot de passe" },
        { field: "verifyPassword", fieldname: "Confirmez votre mot de passe" },
      ],
    },
    {
      field: "Nom de la structure",
      data: [{ field: "name", fieldname: "Nom de la structure" }],
    },
    {
      field: "Type de structure",
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
      data: [{ field: "phone_number", fieldname: "Numéro de téléphone" }],
    },
    {
      field: "Description",
      data: [{ field: "description", fieldname: "Description" }],
    },
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
      data: [{ field: "place", fieldname: "Nombre de places" }],
    },
  ];
  const [infoToModify, setInfoToModify] = useState({});
  const [activeField, setActiveField] = useState(null);
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
    place: null,
  });
  return (
    <div className={styles.modifydata_box}>
      <Recap
        registerInfo={registerInfo}
        fieldsToComplete={fieldsToComplete}
        infoToModify={infoToModify}
        setInfoToModify={setInfoToModify}
        setActiveField={setActiveField}
      />
      <FormBlock
        registerInfo={registerInfo}
        setRegisterInfo={setRegisterInfo}
        infoToModify={infoToModify}
        setInfoToModify={setInfoToModify}
        fieldsToComplete={fieldsToComplete}
        activeField={activeField}
        setActiveField={setActiveField}
      />
    </div>
  );
}
