import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import DesignWelcome from "../../DesignWelcome";
import "../EmailForReset/EmailForReset.css";
import instance from "../../../services/APIService";

export default function EmailForResetPro() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { role } = useParams();
  const { passwordToken } = useParams();
  // const navigate = useNavigate();
  const [infoMessage, setInfoMessage] = useState(null);
  const notifySuccess = () => {
    toast("Votre mot de passe a bien été changé.", {
      icon: "🚀",
    });
  };
  const notifyFail = () => {
    toast("Une erreur s'est produite, veuillez réessayer.");
  };

  const validateLogin =
    password.length >= 6 &&
    password === confirmPassword &&
    password !== null &&
    confirmPassword !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin) {
      instance
        .post(`/${role}/resetpassword`, { password, passwordToken })
        .then((res) => {
          if (res.status === 202) {
            notifySuccess();
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
  console.info(password);
  console.info(confirmPassword);
  return (
    <div className="email-for-reset_page">
      <DesignWelcome />
      <div className="email-reset-form-container">
        <div className="reset-explaination-div">
          Veuillez entrer votre nouveau mot de passe et confirmer le afin de
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
        autoClose={4000}
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
