import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DesignWelcome from "../../DesignWelcome";
import "../EmailForReset/EmailForReset.css";

export default function EmailForResetPro() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { passwordToken } = useParams();
  const navigate = useNavigate();
  const [infoMessage, setInfoMessage] = useState(null);
  const notifySuccess = () => {
    toast.success(
      "Votre mot de passe a bien été changé. Vous allez être redirigé.",
      {
        icon: "🚀",
      }
    );
  };
  const notifyFail = () => {
    toast.error("Une erreur s'est produite, veuillez réessayer.");
  };

  const validateLogin =
    password.length >= 6 &&
    password === confirmPassword &&
    password !== null &&
    confirmPassword !== null;

  const navigateToHome = () => {
    navigate("/particulier");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin) {
      axios
        .post(`${BACKEND_URL}/parent/resetpassword`, {
          password,
          passwordToken,
        })
        .then((res) => {
          if (res.status === 202) {
            notifySuccess();
            setTimeout(navigateToHome, 3000);
          } else {
            notifyFail();
          }
        })
        .catch((error) => console.warn(error));
    } else {
      setInfoMessage("Les mots de passe que vous avez choisi sont invalides");
    }
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="email-for-reset_page">
      <DesignWelcome home={false} />
      <div className="email-reset-form-container">
        <div className="reset-explaination-div">
          Veuillez entrer votre nouveau mot de passe et confirmez-le afin de
          valider la réinitialisation.
        </div>
        {infoMessage ? <Alert severity="warning">{infoMessage}</Alert> : null}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div className="field">
            <InputLabel htmlFor="password">Nouveau mot de passe</InputLabel>
            <TextField
              required
              name="password"
              id="password"
              label="Nouveau mot de passe"
              onChange={handleChangePassword}
              type="password"
            />
          </div>
          <div className="field">
            <InputLabel htmlFor="confirm-password">
              Confirmer votre nouveau mot de passe
            </InputLabel>
            <TextField
              required
              name="confirm-password"
              id="confirm-password"
              label="Confirmer le mot de passe"
              onChange={handleConfirmPassword}
              type="password"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Envoyer
          </Button>
        </Box>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
