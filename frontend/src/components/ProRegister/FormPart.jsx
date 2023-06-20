import React from "react";
import PropTypes from "prop-types";
import { TextField, Switch, FormControlLabel } from "@mui/material";

function FormPart({ data }) {
  // if (data.length === 1) {
  //   return <TextField label={data.fieldname} />;
  // }
  return data.map((row) => {
    if (typeof row === "string") {
      return (
        <FormControlLabel
          value="top"
          control={<Switch color="primary" />}
          label={row}
          labelPlacement="top"
        />
      );
    }
    return <TextField label={row.fieldname} />;
  });
}

export default FormPart;

FormPart.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};
