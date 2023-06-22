import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Alert } from "@mui/material";
import Joi from "joi";
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
  const [validationMessage, setValidationMessage] = useState(null);

  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(80).messages({
      "string.min":
        "Votre nom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre nom doit avoir une longueur maximale de 80 caractères.",
      "string.alphanum":
        "Votre nom doit être constitué uniquement de caractères alphanumériques.",
    }),
    mail_address: Joi.string()
      .email({
        // minDomainAtoms: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .messages({
        "string.email": "Vous devez entrez une adresse mail valide.",
      }),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        "string.pattern.base":
          "Votre mot de passe doit être constitué uniquement de caractères alphanumériques et doit être d'une taille de 3 à 30 caractères.",
      }),
    verifyPassword: Joi.any().valid(Joi.ref("password")).messages({
      "any.only": "Vos mots de passe ne correspondent pas.",
    }),
    address: Joi.string().alphanum().min(3).max(80).messages({
      "string.min":
        "Votre adresse doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre adresse doit avoir une longueur maximale de 80 caractères.",
      "string.alphanum":
        "Votre adresse doit être constitué uniquement de caractères alphanumériques.",
    }),
    postcode: Joi.number().integer().messages({
      "number.base":
        "Votre code postal doit être constitué uniquement de caractères numériques.",
    }),
    city: Joi.string().alphanum().min(3).max(45).messages({
      "string.min":
        "Le nom de la ville doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Le nom de la ville doit avoir une longueur maximale de 45 caractères.",
      "string.alphanum":
        "Le nom de la ville doit être constitué uniquement de caractères alphanumériques.",
    }),
    phone_number: Joi.number().integer().messages({
      "number.base":
        "Votre numéro de téléphone doit être constitué uniquement de caractères numériques.",
    }),
    description: Joi.string().alphanum().min(20).max(255).messages({
      "string.min":
        "La description doit avoir une longueur minimale de 20 caractères.",
      "string.max":
        "La description doit avoir une longueur maximale de 255 caractères.",
      "string.alphanum":
        "La description doit être constituée uniquement de caractères alphanumériques.",
    }),
    type: Joi.string(),
    disponibility: Joi.array(),
    places: Joi.number().integer().messages({
      "number.base":
        "Le nombre de places doit être constitué uniquement de caractères numériques.",
    }),
    empty: Joi.boolean(),
  });

  // Le message de présentation du bloc de formulaire change en fonction du bloc de données à modifier
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

  // le state FormFields est mis en place pour vérifier que tous les champs du bloc de formulaire sont complétés avant d'activer le bouton OK.
  // Celui-ci change à chaque fois que le activeField est modifié.
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

  // mise à jour du registerInfo avec les infos du bloc de formulaire lors de la validation du bloc
  // reset du formBlockInfo et de l'activeField
  const handleConfirm = () => {
    const { error } = schema.validate(formBlockInfo, {
      // abortEarly: false,
    });
    if (error) {
      setValidationMessage(error.message);
    } else {
      setRegisterInfo({ ...registerInfo, ...formBlockInfo });
      setFormBlockInfo({ empty: true });
      setActiveField(null);
      setValidationMessage(null);
    }
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
                    setValidationMessage={setValidationMessage}
                  />
                );
              }
              return null;
            })
          : null}
        {validationMessage ? (
          <Alert severity="error">{validationMessage}</Alert>
        ) : null}
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
