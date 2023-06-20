import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import styles from "./FormBlock.module.css";
import FormPart from "./FormPart";

function FormBlock({ activeField, setActiveField, fieldsToComplete }) {
  const [formMessage, setFormMessage] = useState(null);
  useEffect(() => {
    if (activeField === "Informations de connexion") {
      setFormMessage("Veuillez renseigner vos informations de connexion :");
    } else if (activeField === "Nom de la structure") {
      setFormMessage("Veuillez indiquer le nom de votre structure :");
    } else if (activeField === "Téléphone") {
      setFormMessage(
        "Veuillez indiquer le numéro de téléphone de votre structure :"
      );
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
        "Veuillez préiciser le nombre de places disponibles dans votre structure :"
      );
    }
  }, [activeField]);
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
      {activeField
        ? fieldsToComplete.map((field) => {
            if (field.field === activeField) {
              return <FormPart data={field.data} activeField={activeField} />;
            }
            return null;
          })
        : null}

      {activeField ? (
        <div className={styles.formFooter}>
          <Button variant="contained" onClick={() => setActiveField(null)}>
            Retour
          </Button>
          <Button variant="contained" disabled>
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
  fieldsToComplete: PropTypes.arrayOf.isRequired,
};
