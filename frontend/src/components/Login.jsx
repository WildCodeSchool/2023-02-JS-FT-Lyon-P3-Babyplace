import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Login.module.css";
import DesignWelcome from "./DesignWelcome";
import instance from "../services/APIService";

function Login({ userType }) {
  const [loginInfo, setLoginInfo] = useState({});
  const [infoMessage, setInfoMessage] = useState(null);
  // TODO Faire context pour utilisateur et token
  const { user, login, pendingReservation, setPendingReservation } =
    useUserContext();
  const navigate = useNavigate();

  const validateLogin =
    Object.values(loginInfo).length === 2 &&
    !Object.values(loginInfo).includes("");
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
      instance
        .post(`/${userType}/login`, loginInfo)
        .then((response) => {
          login(response.data);
          if (response.data.role === "parent") {
            if (pendingReservation) {
              setPendingReservation(null);
              navigate(`/particulier/recherche/${pendingReservation}/date`);
            } else {
              navigate(`/particulier/${response.data.id}`);
            }
          } else {
            navigate("/pro");
          }
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
          {user?.role ? (
            <Alert severity="warning">{`Connecté en tant que ${user.role} : vous n'avez pas accès à cette partie du site`}</Alert>
          ) : null}
          {infoMessage ? <Alert severity="warning">{infoMessage}</Alert> : null}
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
              type="password"
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
          {userType === "pro" ? (
            <div className={styles.switch}>
              <p>Pas encore inscrit ?</p>
              <Link to="/pro-inscription"> Cliquez ici</Link>
            </div>
          ) : (
            <div className={styles.switch}>
              <p>Pas encore inscrit ?</p>
              <Link to="/particulier/enregistrement"> Cliquez ici</Link>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  userType: PropTypes.string.isRequired,
};
