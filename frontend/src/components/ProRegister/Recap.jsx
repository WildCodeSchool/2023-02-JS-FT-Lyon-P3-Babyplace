import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, Container } from "@mui/material";
import styles from "./Recap.module.css";

function Recap({ registerInfo, fieldsToComplete, setActiveField }) {
  return (
    <div className={styles.recapPage}>
      <Container>
        <div className={styles.text}>
          <p>Voici le résumé de vos informations</p>
        </div>

        <div className={styles.recapBlock}>
          {fieldsToComplete.map((field) => {
            return (
              <TextField
                key={field.field}
                label={field.field}
                disabled
                content={field.field}
                onClick={setActiveField(field.field)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              />
            );
          })}
        </div>
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
      </Container>
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
