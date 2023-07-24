import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormParent.module.css";

export default function FormParent() {
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
    birthdate: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .messages({
        "string.pattern.base":
          "Votre date de naissance doit respecter le format AAAA/MM/JJ.",
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
    if (!user?.id) {
      instance
        .post("/parent/register", formInfo)
        .then((response) => {
          if (response.status === 201) {
            setValidationMessage(
              "Compte créé. Vous pouvez désormais vous connecter."
            );
          }
        })

        .catch((err) => {
          if (err.response.status === 400)
            setValidationMessage("Veuillez utiliser une autre adresse mail");
        });
    } else {
      instance
        .patch(`/parent/modify`, formInfo)
        .then((response) => {
          if (response.status === 201) {
            setValidationMessage(
              "Les validations ont bien été prises en compte."
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

  if (!user?.id) {
    return (
      <div className={style.page}>
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
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formInfo.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birthdate"
            placeholder="Date de naissance AAAA/MM/JJ"
            value={formInfo.birthdate}
            pattern="\d{4}/\d{2}/\d{2}"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="mail_address"
            placeholder="Email"
            value={formInfo.mail_address}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formInfo.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="verifyPassword"
            placeholder="Confirmez votre mot de passe"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Numéro et nom de voie"
            value={formInfo.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="postcode"
            placeholder="Code postal"
            value={formInfo.postcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={formInfo.city}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phone_number"
            placeholder="Téléphone mobile"
            value={formInfo.phone_number}
            onChange={handleChange}
            required
          />
          <div className={style.validationMessage}>
            {validationMessage ===
            "Veuillez utiliser une autre adresse mail" ? (
              <Alert
                severity={
                  validationMessage ===
                  "Veuillez utiliser une autre adresse mail"
                    ? "error"
                    : "success"
                }
              >
                {validationMessage}
              </Alert>
            ) : null}
            {validationMessage !==
            "Compte créé. Vous pouvez désormais vous connecter." ? (
              <button type="submit" className={style.buttonSubmit}>
                Créer un compte
              </button>
            ) : null}

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
          </div>
        </form>

        {validationMessage ===
        "Compte créé. Vous pouvez désormais vous connecter." ? (
          <Link to="/particulier/enregistrement/bienvenue">
            <button type="button" className={style.buttonNext}>
              Suivant
            </button>
          </Link>
        ) : null}
      </div>
    );
  }
  if (user?.id) {
    return (
      <div className={style.form_modify}>
        <h3>Modifier vos informations :</h3>
        <form className={style.formModify} onSubmit={handleSubmit}>
          <label htmlFor="lastname">Nom de famille</label>
          <input
            type="text"
            name="lastname"
            placeholder={user.lastname}
            value={formInfo.lastname}
            onChange={handleChange}
          />
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            placeholder={user.firstname}
            value={formInfo.firstname}
            onChange={handleChange}
          />
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            placeholder={user.address}
            value={formInfo.address}
            onChange={handleChange}
          />
          <label htmlFor="postcode">Code postal</label>

          <input
            type="number"
            name="postcode"
            placeholder={user.postcode}
            value={formInfo.postcode}
            onChange={handleChange}
          />
          <label htmlFor="city">Ville</label>

          <input
            type="text"
            name="city"
            placeholder={user.city}
            value={formInfo.city}
            onChange={handleChange}
          />
          <label htmlFor="phone_number">Nom de famille</label>

          <input
            type="number"
            name="phone_number"
            placeholder={user.phone_number}
            value={formInfo.phone_number}
            onChange={handleChange}
          />
          <div className={style.validationMessage}>
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
            "Les validations ont bien été prises en compte." ? (
              <Alert
                severity={
                  validationMessage ===
                  "Les validations ont bien été prises en compte."
                    ? "success"
                    : "error"
                }
              >
                {validationMessage}
              </Alert>
            ) : null}
            <button type="submit" className={style.buttonSubmit}>
              Valider les modifications
            </button>
          </div>
        </form>
      </div>
    );
  }
}
