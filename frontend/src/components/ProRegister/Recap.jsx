import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid } from "@mui/material";
import styles from "./Recap.module.css";

function Recap({ registerInfo, fieldsToComplete, setActiveField }) {
  const handleSubmitRegister = () => {
    console.warn("Submit !");
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
                    console.warn("click");
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
          <div className={styles.recapFooter}>
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
