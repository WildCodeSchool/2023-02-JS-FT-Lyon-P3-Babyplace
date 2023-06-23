import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
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
    phone_number: Joi.number().less(10).integer().messages({
      "number.base":
        "Votre numéro de téléphone doit être constitué uniquement de caractères numériques.",
      "number.less":
        "Votre numéro de téléphone doit respecter le format requis.",
    }),
  });
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      lastname,
      firstname,
      birthdate,
      mail_address: email,
      password,
      address,
      postcode: postCode,
      city,
      phone_number: phoneNumber,
    };
    const { error } = schema.validate(formData);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }
    // Envoi au back des données recueillies dans le form
    axios
      .post(`${backEndUrl}/parent`, formData)
      .then((response) => response.data)

      .catch((err) => console.error(err));
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
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Date de naissance"
          value={birthdate}
          pattern="\d{2}/\d{2}/\d{4}"
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <input
          type="text"
          name="mail_address"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Numéro et nom de voie"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          name="postcode"
          placeholder="Code postal"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="number"
          name="phone_number"
          placeholder="Téléphone mobile"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {validationMessage ? (
          <Alert severity="error">{validationMessage}</Alert>
        ) : null}
        <button type="submit" className={style.button}>
          Créer un compte
        </button>
      </form>
    </div>
  );
}
