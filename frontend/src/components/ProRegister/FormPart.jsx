import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

function FormPart({ data, formBlockInfo, setFormBlockInfo }) {
  const [state, setState] = useState({});

  const handleSwitch = (event) => {
    if (data[0].multiple) {
      setState({ ...state, [event.target.name]: event.target.checked });
      if (event.target.checked) {
        setFormBlockInfo({
          ...formBlockInfo,
          empty: false,
          [data[0].field]: [...event.target.name],
        });
      } else if ([data[0].field] === []) {
        // TODO Voir avec Pierre pourquoi [vite] warning: Comparison using the "===" operator here is always false
        setFormBlockInfo({
          ...formBlockInfo,
          empty: true,
        });
      } else {
        setFormBlockInfo({
          ...formBlockInfo,
          empty: false,
          // TODO Voir avec Pierre pour cette condition
          // [data[0].field]: data[0].data.filter(data => )
        });
      }
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
      if (event.target.checked) {
        setFormBlockInfo({
          ...formBlockInfo,
          empty: false,
          [data[0].field]: event.target.name,
        });
      } else {
        setFormBlockInfo({ empty: true });
      }
    }
  };

  const handleRadioButtonChange = (e) => {
    setFormBlockInfo({
      ...formBlockInfo,
      empty: false,
      [data[0].field]: e.target.value,
    });
  };

  const handleFieldChange = (e, field) => {
    setFormBlockInfo({
      ...formBlockInfo,
      empty: false,
      [field]: e.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(formBlockInfo);
  //   console.log(Object.keys(formBlockInfo));
  //   console.log(Object.entries(formBlockInfo));
  // }, [formBlockInfo]);

  useEffect(() => {
    return setFormBlockInfo({ empty: true });
  }, []);

  if (data[0].data && typeof data[0].data[0] === "string" && data[0].multiple) {
    return data[0].data.map((dataRow) => {
      return (
        <FormControlLabel
          value="top"
          control={
            <Switch name={dataRow} onChange={handleSwitch} color="primary" />
          }
          label={dataRow}
          labelPlacement="top"
        />
      );
    });
  }
  if (
    data[0].data &&
    typeof data[0].data[0] === "string" &&
    !data[0].multiple
  ) {
    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Type de structure
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={data[0].data}
          onChange={(e) => handleRadioButtonChange(e)}
        >
          {data[0].data.map((dataRow) => {
            return (
              <FormControlLabel
                value={dataRow}
                control={<Radio />}
                label={dataRow}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  }

  return data.map((row) => {
    return (
      <TextField
        label={row.fieldname}
        type={
          row.fieldname === "Mot de passe" ||
          row.fieldname === "Confirmez votre mot de passe"
            ? "password"
            : "text"
        }
        onChange={(e) => handleFieldChange(e, row.field)}
      />
    );
  });
}

export default FormPart;

FormPart.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  formBlockInfo: PropTypes.shape({
    empty: PropTypes.bool.isRequired,
  }).isRequired,
  setFormBlockInfo: PropTypes.func.isRequired,
};
