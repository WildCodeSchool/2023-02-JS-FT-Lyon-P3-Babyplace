import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import styles from "./AuthenticationChange.module.css";
import AccountHeader from "./AccountHeader";

function AuthenticationChange({ setAccountScreen }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmitMail = (e) => {
    e.preventDefault();
    setMessage("Votre adrese mail a bien été modifiée.");
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setMessage("Votre mot de passe a bien été modifié.");
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
    <div>
      <AccountHeader />
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
          {message === "Votre adrese mail a bien été modifiée." ? (
            <Alert color="success">{message}</Alert>
          ) : null}
        </Box>
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
          {message === "Votre mot de passe a bien été modifié." ? (
            <Alert color="success">{message}</Alert>
          ) : null}
        </Box>
      </div>
    </div>
  );
}

export default AuthenticationChange;

AuthenticationChange.propTypes = {
  setAccountScreen: PropTypes.func.isRequired,
};
