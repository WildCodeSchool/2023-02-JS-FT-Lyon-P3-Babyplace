import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Login.module.css";
import DesignWelcome from "./DesignWelcome";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login({ userType }) {
  const [loginInfo, setLoginInfo] = useState({});
  const [infoMessage, setInfoMessage] = useState(null);
  // TODO Faire context pour utilisateur et token
  const { user, setUser, token, setToken } = useUserContext();

  const validateLogin = () => {
    return true;
  };

  // Met à jour le state loginInfo à chaque fois qu'un des champs du formulaire est changé.
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  // le userType change en fonction de la page depuis laquelle est appelé le composant Login ("pro" depuis l'espace pro, "parent" depuis l'espace particulier)
  // la route utilisée change donc selon le profil de l'utilisateur
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateLogin) {
      // TODO gérer l'authentification de manière plus approfondie lorsqu'on aura eu tous les cours sur le sujet
      axios
        .post(`${BACKEND_URL}/${userType}/login`, loginInfo)
        .then((response) => {
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          setUser(response.data.user);
          setToken(response.data.token);
          // TODO effectuer le changement de page ici
        })
        .catch((error) => {
          if (error.response?.status === 401)
            setInfoMessage("Les informations renseignées sont incorrectes.");
          else setInfoMessage("Merci d'essayer plus tard.");
        });
    } else {
      setInfoMessage("Merci de compléter tous les champs.");
    }
  };

  return (
    <div className={styles.login}>
      <DesignWelcome />
      <div className={styles.loginForm}>
        <div>
          <p>{user && token ? user.mail_address : null}</p>
          <p className={styles.infoMessage}>{infoMessage || null}</p>
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onSubmit={handleSubmit}
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
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              required
              name="password"
              id="password"
              label="Entrez votre mot de passe"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Je me connecte
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  userType: PropTypes.string.isRequired,
};
