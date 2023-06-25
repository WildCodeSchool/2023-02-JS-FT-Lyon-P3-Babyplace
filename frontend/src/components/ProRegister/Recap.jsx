import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid, Alert } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Recap.module.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Recap({ registerInfo, fieldsToComplete, setActiveField }) {
  const [formValidationMessage, setFormValidationMessage] = useState(null);
  const handleSubmitRegister = () => {
    axios
      .post(`${BACKEND_URL}/pro/register`, registerInfo)
      .then((response) => {
        if (response.status === 201) {
          setFormValidationMessage(
            "Compte créé. Vous pouvez désormais vous connecter."
          );
        }
      })
      .catch((error) => {
        if (error.response?.status === 400)
          setFormValidationMessage("Veuillez utiliser une autre adresse mail");
      });
  };

  return (
    <div className={styles.recapPage}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={styles.text}>
            <h2>Voici le résumé de vos informations</h2>
          </div>
        </Grid>
        <div className={styles.recapBlock}>
          {fieldsToComplete.map((field) => {
            const fieldsToConcatenate = [];
            for (const fieldBlock of fieldsToComplete) {
              if (fieldBlock.field === field.field) {
                for (const row of fieldBlock.data) {
                  fieldsToConcatenate.push(row.field);
                }
              }
            }
            let valuesToConcatenate;
            // Les lignes suivantes concatènent les informations et les affichent dans les blocs du récap sous certaines conditions
            Object.entries(registerInfo).forEach((array) => {
              if (
                fieldsToConcatenate.includes(array[0]) &&
                array[0] !== "password" &&
                array[0] !== "verifyPassword" &&
                array[1] !== "" &&
                array[1] !== null
              ) {
                valuesToConcatenate = [];
                valuesToConcatenate.push(array[1]);
              }
            });

            return (
              <Grid item xs={12}>
                <TextField
                  key={field.field}
                  label={field.field}
                  margin="normal"
                  value={
                    valuesToConcatenate ? valuesToConcatenate.join(", ") : ""
                  }
                  content={field.field}
                  color={valuesToConcatenate ? "success" : "warning"}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveField(field.field);
                  }}
                >
                  Modifier
                </Button>
              </Grid>
            );
          })}
        </div>
        <Grid item xs={12}>
          {formValidationMessage ? (
            <Alert
              severity={
                formValidationMessage ===
                "Veuillez utiliser une autre adresse mail"
                  ? "error"
                  : "success"
              }
            >
              {formValidationMessage}
            </Alert>
          ) : null}
          <div className={styles.recapFooter}>
            {/* Tant que toutes les données de formulaires ne sont pas renseignées, le bouton OK est désactivé */}
            {formValidationMessage ===
            "Compte créé. Vous pouvez désormais vous connecter." ? (
              <Link to="/pro">
                <Button variant="contained">Se connecter</Button>
              </Link>
            ) : (
              <Button
                onClick={handleSubmitRegister}
                variant="contained"
                disabled={
                  Object.values(registerInfo).includes(null) ||
                  Object.values(registerInfo).includes([]) ||
                  Object.values(registerInfo).includes("")
                }
              >
                Terminer
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Recap;

Recap.propTypes = {
  fieldsToComplete: PropTypes.arrayOf.isRequired,
  registerInfo: PropTypes.arrayOf.isRequired,
  setActiveField: PropTypes.func.isRequired,
};
