import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import styles from "./FormBlock.module.css";
import FormPart from "./FormPart";

function FormBlock({
  activeField,
  setActiveField,
  fieldsToComplete,
  registerInfo,
  setRegisterInfo,
}) {
  const [formBlockInfo, setFormBlockInfo] = useState({ empty: true });
  const [formMessage, setFormMessage] = useState(null);
  const [formFields, setFormFields] = useState([]);
  useEffect(() => {
    if (activeField === "Informations de connexion") {
      setFormMessage("Veuillez renseigner vos informations de connexion :");
    } else if (activeField === "Nom de la structure") {
      setFormMessage("Veuillez indiquer le nom de votre structure :");
    } else if (activeField === "Téléphone") {
      setFormMessage(
        "Veuillez indiquer le numéro de téléphone de votre structure :"
      );
    } else if (activeField === "Type de structure") {
      setFormMessage("Veuillez indiquer le type de votre structure :");
    } else if (activeField === "Description") {
      setFormMessage(
        "Veuillez renseigner une brève description de votre structure :"
      );
    } else if (activeField === "Adresse") {
      setFormMessage("Veuillez renseigner l'adresse de votre structure :");
    } else if (activeField === "Disponibilité") {
      setFormMessage(
        "Veuillez indiquer les jours d'ouverture de votre structure :"
      );
    } else if (activeField === "Nombre de places") {
      setFormMessage(
        "Veuillez préciser le nombre de places disponibles dans votre structure :"
      );
    }
  }, [activeField]);

  useEffect(() => {
    const arraOfFields = [];
    fieldsToComplete.forEach((field) => {
      if (field.field === activeField) {
        field.data.forEach((fieldData) => {
          arraOfFields.push(fieldData.field);
        });
      }
    });
    setFormFields(arraOfFields);
  }, [activeField]);

  // useEffect(() => {
  //   console.log(registerInfo);
  // }, [registerInfo]);

  const handleConfirm = () => {
    const displayedFields = [];
    for (const fieldBlock of fieldsToComplete) {
      if (fieldBlock.field === activeField) {
        for (const field of fieldBlock.data) {
          displayedFields.push(field.field);
        }
      }
    }
    console.warn(displayedFields);

    if (
      displayedFields.some(
        (field) =>
          Object.keys(formBlockInfo).includes(field) === false ||
          Object.values(formBlockInfo).includes("")
      )
    ) {
      console.warn("pas complet !");
    } else {
      console.warn("complet");
      setRegisterInfo({ ...registerInfo, ...formBlockInfo });
    }
    setFormBlockInfo({ empty: true });
    setActiveField(null);
  };

  return (
    <div className={styles.formBlockPage}>
      {activeField ? (
        <h2 className={styles.message}>
          Veuillez compléter les informations ci-dessous
        </h2>
      ) : (
        <h2>Sélectionnez un champ à compléter</h2>
      )}
      {activeField ? <p className={styles.formMessage}>{formMessage}</p> : null}
      <div className={styles.formPart}>
        {activeField
          ? fieldsToComplete.map((field) => {
              if (field.field === activeField) {
                return (
                  <FormPart
                    data={field.data}
                    activeField={activeField}
                    formBlockInfo={formBlockInfo}
                    setFormBlockInfo={setFormBlockInfo}
                  />
                );
              }
              return null;
            })
          : null}
      </div>
      {activeField ? (
        <div className={styles.formFooter}>
          <Button
            variant="contained"
            onClick={() => {
              setFormBlockInfo({ empty: true });
              setActiveField(null);
            }}
          >
            Retour
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={
              Object.entries(formBlockInfo)[0]?.includes(true) ||
              Object.values(formBlockInfo)?.includes("") ||
              Object.keys(formBlockInfo)?.length < formFields.length + 1
            }
          >
            OK
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default FormBlock;

FormBlock.propTypes = {
  activeField: PropTypes.string.isRequired,
  setActiveField: PropTypes.func.isRequired,
  registerInfo: PropTypes.string.isRequired,
  setRegisterInfo: PropTypes.func.isRequired,
  fieldsToComplete: PropTypes.arrayOf.isRequired,
};
