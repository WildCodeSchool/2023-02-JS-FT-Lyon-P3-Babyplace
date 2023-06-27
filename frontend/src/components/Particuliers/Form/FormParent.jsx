import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import style from "./FormParent.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function FormParent() {
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
    birthdate: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .messages({
        "string.pattern.base":
          "Votre date de naissance doit respecter le format JJ/MM/AAAA.",
      }),
    mail_address: Joi.string()
      .email({
        minDomainSegments: 2,
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
    address: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre adresse doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre adresse doit avoir une longueur maximale de 80 caractères.",
    }),
    postcode: Joi.number().integer().messages({
      "number.base":
        "Votre code postal doit être constitué uniquement de caractères numériques.",
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
          "Votre numéro de téléphone doit respecter le format requis.",
      }),
  });
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    mail_address: "",
    password: "",
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

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }
    // Envoi au back des données recueillies dans le formulaire
    axios
      .post(`${backEndUrl}/parent`, formInfo)
      .then((response) => {
        if (response.status === 201) {
          setValidationMessage(
            "Compte créé. Vous pouvez désormais vous connecter."
          );
        }
      })

      .catch((err) => {
        if (err.response.status === 500)
          setValidationMessage("Veuillez utiliser une autre adresse mail");
      });
  };
  return (
    <div className={style.card}>
      <div className={style.header_card}>
        <button
          type="button"
          className={style.button_back}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </button>
        <div className={style.name_type}>
          <h2>Création de compte</h2>
        </div>
      </div>
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
          placeholder="Date de naissance"
          value={formInfo.birthdate}
          pattern="\d{4}/\d{2}/\d{2}"
          onChange={handleChange}
        />
        <input
          type="email"
          name="mail_address"
          placeholder="Email"
          value={formInfo.mail_address}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formInfo.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Numéro et nom de voie"
          value={formInfo.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="postcode"
          placeholder="Code postal"
          value={formInfo.postcode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={formInfo.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone_number"
          placeholder="Téléphone mobile"
          value={formInfo.phone_number}
          onChange={handleChange}
        />
      </form>
      <div className={style.validationMessage}>
        {validationMessage === "Veuillez utiliser une autre adresse mail" ? (
          <Alert
            severity={
              validationMessage === "Veuillez utiliser une autre adresse mail"
                ? "error"
                : "success"
            }
          >
            {validationMessage}
          </Alert>
        ) : null}
        {validationMessage !==
        "Compte créé. Vous pouvez désormais vous connecter." ? (
          <button type="submit" className={style.button}>
            Créer un compte
          </button>
        ) : null}
      </div>
      {validationMessage ===
      "Compte créé. Vous pouvez désormais vous connecter." ? (
        <Alert
          severity={
            validationMessage ===
            "Compte créé. Vous pouvez désormais vous connecter."
              ? "success"
              : "error"
          }
        >
          {validationMessage}
        </Alert>
      ) : null}
      {validationMessage ===
      "Compte créé. Vous pouvez désormais vous connecter." ? (
        <Link to="/particulier">
          <button type="button" className={style.button}>
            Se connecter
          </button>
        </Link>
      ) : null}
    </div>
  );
}
