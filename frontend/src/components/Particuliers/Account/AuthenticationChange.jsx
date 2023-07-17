import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import Joi from "joi";
import styles from "./AuthenticationChange.module.css";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";

function AuthenticationChange({ setAccountScreen }) {
  const { logout } = useUserContext();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState(null);
  const mailErrorMessages = [
    "Vous devez entrez une adresse mail valide.",
    "Vous ne pouvez pas choisir cette adresse mail",
  ];
  const passwordErrorMessages = [
    "Votre mot de passe doit être constitué uniquement de caractères alphanumériques et doit être d'une taille de 3 à 30 caractères.",
    "Vos mots de passe ne correspondent pas.",
    "Quelque chose s'est mal passé, réessayez plus tard.",
  ];

  // Déclaration du schéma de validation des formulaires de modification de données d'authentification
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .messages({
        "string.email": mailErrorMessages[0],
      }),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        "string.pattern.base": passwordErrorMessages[0],
      }),
    verifyPassword: Joi.any().valid(Joi.ref("password")).messages({
      "any.only": passwordErrorMessages[1],
    }),
  });

  // Gestion du changement de l'adresse mail
  const handleSubmitMail = (e) => {
    e.preventDefault();
    const { error } = schema.validate({ email: mail });
    if (error) {
      return setMessage(error.message);
    }
    return instance
      .patch("/parent/mail", { mail_address: mail })
      .then(() => {
        setMail("");
        setMessage("Votre adresse mail a bien été modifiée.");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout(true);
        }
        if (err.response.status === 400) {
          setMessage(mailErrorMessages[1]);
        }
      });
  };
  // Gestion du changement de mot de passe
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const { error } = schema.validate({ password, verifyPassword });
    if (error) {
      return setMessage(error.message);
    }
    return instance
      .patch("/parent/password", { password })
      .then(() => {
        setMessage("Votre mot de passe a bien été modifié.");
        setPassword("");
        setVerifyPassword("");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout(true);
        }
        setMessage(passwordErrorMessages[2]);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setMail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "verifypassword") {
      setVerifyPassword(e.target.value);
    }
  };

  return (
    <>
      <div className={styles.banner}>
        <button
          type="button"
          className={styles.button_back}
          onClick={() => setAccountScreen("menu")}
        >
          <ArrowBackIosNewIcon />
        </button>
        <p>Données d'authentification</p>
      </div>
      <div className={styles.formScreen}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              onSubmit={(e) => handleSubmitMail(e)}
              noValidate
              autoComplete="off"
            >
              <div className={styles.field}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  required
                  name="email"
                  id="email"
                  label="Entrez votre adresse mail"
                  value={mail}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Changer l'adresse mail
              </Button>
            </Box>
            {message === "Votre adresse mail a bien été modifiée." ? (
              <Alert severity="success">{message}</Alert>
            ) : null}
            {mailErrorMessages.includes(message) ? (
              <Alert severity="error">{message}</Alert>
            ) : null}
            <span className={styles.separator} />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              onSubmit={(e) => handleSubmitPassword(e)}
              noValidate
              autoComplete="off"
            >
              <div className={styles.field}>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <TextField
                  required
                  name="password"
                  id="password"
                  label="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  type="password"
                />
              </div>
              <div className={styles.field}>
                <InputLabel htmlFor="verifypassword">
                  Confirmez le mot de passe
                </InputLabel>
                <TextField
                  required
                  name="verifypassword"
                  id="verifypassword"
                  label="Entrez votre mot de passe"
                  value={verifyPassword}
                  onChange={handleChange}
                  type="password"
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Changer le mot de passe
              </Button>
            </Box>
            {message === "Votre mot de passe a bien été modifié." ? (
              <Alert severity="success">{message}</Alert>
            ) : null}
            {passwordErrorMessages.includes(message) ? (
              <Alert severity="error">{message}</Alert>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthenticationChange;

AuthenticationChange.propTypes = {
  setAccountScreen: PropTypes.func.isRequired,
};
