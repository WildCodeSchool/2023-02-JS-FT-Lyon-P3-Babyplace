import React, { useState } from "react";
import { Alert } from "@mui/material";
import Joi from "joi";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormParent.module.css";

export default function ModifyParent() {
  const { user, setUser } = useUserContext();

  // Mise en place du schema pour les validateurs Joi
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

    address: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre adresse doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre adresse doit avoir une longueur maximale de 80 caractères.",
    }),
    postcode: Joi.string()
      .regex(/^[0-9]{5}$/)
      .messages({
        "string.pattern.base":
          "Votre code postal doit être constitué uniquement de 5 caractères numériques.",
      }),
    city: Joi.string().min(3).max(45).messages({
      "string.min":
        "Le nom de la ville doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Le nom de la ville doit avoir une longueur maximale de 45 caractères.",
    }),
    phone_number: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base":
          "Votre numéro de téléphone doit être constitué uniquement de 10 caractères numériques.",
      }),
  });
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    address: "",
    postcode: "",
    city: "",
    phone_number: "",
  });
  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let userModify = {};
    Object.entries(user).forEach((entry) => {
      if (
        entry[0] !== "id" &&
        entry[0] !== "birthdate" &&
        entry[0] !== "mail_address" &&
        entry[0] !== "hashed_password" &&
        entry[0] !== "passwordToken" &&
        entry[0] !== "notification_status" &&
        entry[0] !== "role"
      ) {
        userModify = { ...userModify, [entry[0]]: entry[1] };
      }
    });
    let formInfoModify = {};

    Object.entries(formInfo).forEach((entry) => {
      if (entry[1] !== "") {
        formInfoModify = { ...formInfoModify, [entry[0]]: entry[1] };
      }
    });
    const { error } = schema.validate({ ...userModify, ...formInfoModify });

    if (error) {
      setValidationMessage(error.message);
    } else {
      instance
        .patch(`/parent/modify`, formInfo)
        .then((response) => {
          if (response.status === 201) {
            setValidationMessage(
              "Les informations ont bien été prises en compte."
            );

            setUser(response.data);
          }
        })

        .catch((err) => {
          if (err.response.status === 400)
            setValidationMessage("Veuillez réessayer plus tard.");
        });
    }
  };
  if (!user) return null;
  return (
    <div className={style.form_modify}>
      <h3>Modifier vos informations :</h3>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="lastname"
          placeholder={user.lastname}
          value={formInfo.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder={user.firstname}
          value={formInfo.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder={user.address}
          value={formInfo.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="postcode"
          placeholder={user.postcode}
          value={formInfo.postcode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder={user.city}
          value={formInfo.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone_number"
          placeholder={user.phone_number}
          value={formInfo.phone_number}
          onChange={handleChange}
        />
        <div className={style.validationMessage}>
          {validationMessage !== "Veuillez réessayer plus tard." &&
          validationMessage !==
            "Les informations ont bien été prises en compte." &&
          validationMessage ? (
            <Alert severity="error">{validationMessage}</Alert>
          ) : null}
          {validationMessage === "Veuillez réessayer plus tard." ? (
            <Alert
              severity={
                validationMessage === "Veuillez réessayer plus tard."
                  ? "error"
                  : "success"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}

          {validationMessage ===
          "Les informations ont bien été prises en compte." ? (
            <Alert
              severity={
                validationMessage ===
                "Les informations ont bien été prises en compte."
                  ? "success"
                  : "error"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}
        </div>
        <button type="submit" className={style.buttonSubmit}>
          Valider les modifications
        </button>
      </form>
    </div>
  );
}
