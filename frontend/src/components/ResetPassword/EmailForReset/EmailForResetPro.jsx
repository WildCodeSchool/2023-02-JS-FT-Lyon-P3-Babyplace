import React, { useState } from "react";
import { Box, TextField, Button, InputLabel, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import DesignWelcome from "../../DesignWelcome";
import "./EmailForReset.css";

export default function EmailForResetPro() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const { userType } = useParams();
  // const navigate = useNavigate();
  const [infoMessage, setInfoMessage] = useState(null);
  const notifySuccess = () => {
    toast.success("Un email a été envoyé sur votre boîte mail.", {
      icon: "📧",
    });
  };

  const validateLogin =
    email.length >= 6 && email.includes("@") && email.includes(".");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin) {
      try {
        await axios.post(`${BACKEND_URL}/${userType}/forgottenpassword`, {
          email,
        });
        notifySuccess();
      } catch (error) {
        console.warn(error);
      }
    } else {
      setInfoMessage("Le format de cette adresse mail est invalide");
    }
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.info(`${BACKEND_URL}/${userType}/forgottenpassword`);
  return (
    <div className="email-for-reset_page">
      <DesignWelcome />
      <div className="email-reset-form-container">
        <div className="reset-explaination-div">
          Veuillez entrer votre adresse mail de connexion puis cliquer sur
          "Envoyer" afin de recevoir un mail de réinitialisation de votre mot de
          passe.
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
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              required
              name="email"
              id="email"
              label="Entrez votre adresse mail"
              onChange={handleChange}
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
