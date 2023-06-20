import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid } from "@mui/material";
import styles from "./Recap.module.css";

function Recap({ registerInfo, fieldsToComplete, setActiveField }) {
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
            return (
              <Grid item xs={12}>
                <button
                  type="button"
                  className={styles.formButton}
                  onClick={() => {
                    console.warn("click");
                    setActiveField(field.field);
                  }}
                >
                  <TextField
                    key={field.field}
                    label={field.field}
                    disabled
                    content={field.field}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  />
                  <Button variant="contained">Modifier</Button>
                </button>
              </Grid>
            );
          })}
        </div>
        <Grid item xs={12}>
          <div className={styles.recapFooter}>
            <Button
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
  // activeField: PropTypes.string.isRequired,
  setActiveField: PropTypes.func.isRequired,
};
