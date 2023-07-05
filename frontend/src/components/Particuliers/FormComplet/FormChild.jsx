import React, { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function FormChild() {
  const { user } = useUserContext();
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    walking: "",
    doctor: "",
    parent_id: `${user.id}`,
  });

  const schema = Joi.object({
    lastname: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre nom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre nom doit avoir une longueur maximale de 80 caractères.",
    }),
    firstname: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre prénom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre prénom doit avoir une longueur maximale de 80 caractères.",
    }),
    birthdate: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .messages({
        "string.pattern.base":
          "Votre date de naissance doit respecter le format AAAA/MM/JJ.",
      }),
  });
  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }
    if (!error)
      // Envoi au back des données recueillies dans le formulaire
      axios
        .post(`${backEndUrl}/child/register`, formInfo)
        .then((response) => {
          if (response.status === 201) {
            setValidationMessage("Votre enfant a bien été ajouté.");
          }
        })

        .catch((err) => {
          if (err.response.status === 500)
            setValidationMessage("Erreur: Veuillez recommencer.");
        });
  };
  return (
    <div>
      {" "}
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formInfo.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formInfo.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Date de naissance AAAA/MM/JJ"
          value={formInfo.birthdate}
          pattern="\d{4}/\d{2}/\d{2}"
          onChange={handleChange}
        />
        <input
          type="text"
          name="walking"
          placeholder="Marcheur?"
          value={formInfo.walking}
          onChange={handleChange}
        />
        <input
          type="text"
          name="doctor"
          placeholder="Medecin traitant"
          value={formInfo.doctor}
          onChange={handleChange}
        />
        <div className={style.validationMessage}>
          {validationMessage === "Erreur: Veuillez recommencer." ? (
            <Alert
              severity={
                validationMessage === "Erreur: Veuillez recommencer."
                  ? "error"
                  : "success"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}
          {validationMessage !== "Votre enfant a bien été ajouté." ? (
            <button type="submit" className={style.button}>
              Valider
            </button>
          ) : null}
        </div>
      </form>
      {validationMessage === "Votre enfant a bien été ajouté." ? (
        <Alert
          severity={
            validationMessage === "Votre enfant a bien été ajouté."
              ? "success"
              : "error"
          }
        >
          {validationMessage}
        </Alert>
      ) : null}
    </div>
  );
}
