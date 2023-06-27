import React, { useEffect, useRef } from "react";
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
import { useUserContext } from "../../contexts/UserContext";

function FormPart({ data, formBlockInfo, setFormBlockInfo }) {
  const arrayOfData = useRef([]);
  const { user } = useUserContext;
  // fonction qui gère le fonctionnement des boutons switch
  // mise à jour d'un tableau des données (arrayOfData) pour lesquelles le bouton correspondant est activé
  // et ajout de ce tableau dans le formBlockInfo
  const handleSwitch = (event) => {
    if (data[0].multiple) {
      if (event.target.checked) {
        // dans le cas où le bouton est activé, on ajoute la donnée
        if (arrayOfData.length === 0) {
          arrayOfData.current.push(event.target.name);
        } else {
          arrayOfData.current.push(
            event.target.name.replace(
              event.target.name,
              ` ${event.target.name}`
            )
          );
        }
        setFormBlockInfo({
          ...formBlockInfo,
          empty: false,
          [data[0].field]: arrayOfData.current,
        });
      } else {
        // dans le cas où le bouton est désactivé, on reti la donnée, et si le tableau est vide, on informe que le formBlockInfo est vide
        // pour désactive le bouton OK
        arrayOfData.current.splice(
          arrayOfData.current.indexOf(event.target.name, 1)
        );
        if (arrayOfData.current.length === 0) {
          setFormBlockInfo({
            ...formBlockInfo,
            empty: true,
            [data[0].field]: [],
          });
        } else {
          setFormBlockInfo({
            ...formBlockInfo,
            empty: false,
            [data[0].field]: arrayOfData.current,
          });
        }
      }
    }
  };

  // La fonction suivante permet d'ajouter la données relative au bouton radio dans les données du formBlockInfo
  const handleRadioButtonChange = (e) => {
    setFormBlockInfo({
      ...formBlockInfo,
      empty: false,
      [data[0].field]: e.target.value,
    });
  };

  // La fonction suivante permet d'ajouter la données relative au champ de texte dans les données du formBlockInfo
  const handleFieldChange = (e, field) => {
    setFormBlockInfo({
      ...formBlockInfo,
      empty: false,
      [field]: e.target.value,
    });
  };

  // le formBlockInfo est remis à vide quand le composant est démonté
  useEffect(() => {
    return setFormBlockInfo({ empty: true });
  }, []);

  if (user) {
    if (
      data[0].data &&
      typeof data[0].data[0] === "string" &&
      data[0].multiple
    ) {
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
          margin="normal"
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

  if (!user) {
    if (
      data[0].data &&
      typeof data[0].data[0] === "string" &&
      data[0].multiple
    ) {
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
          margin="normal"
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
}

export default FormPart;

FormPart.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  formBlockInfo: PropTypes.shape({
    empty: PropTypes.bool.isRequired,
  }).isRequired,
  setFormBlockInfo: PropTypes.func.isRequired,
};
