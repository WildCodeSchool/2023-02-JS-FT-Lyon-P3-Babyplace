import React, { useState } from "react";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useParams } from "react-router-dom";
import style from "./FormCompletChildrenParents.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function FormChild() {
  const { id } = useParams();
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    walking: "",
    doctor: "",
    parent_id: `${id}`,
  });
  const [selectedValue, setSelectedValue] = React.useState("");

  const schema = Joi.object({
    lastname: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre nom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre nom doit avoir une longueur maximale de 80 caractères.",
    }),
    firstname: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre prénom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre prénom doit avoir une longueur maximale de 80 caractères.",
    }),
    birthdate: Joi.string()
      .regex(/^\d{4}\/\d{2}\/\d{2}$/)
      .messages({
        "string.pattern.base":
          "Votre date de naissance doit respecter le format AAAA/MM/JJ.",
      }),
  });
  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
    setSelectedValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }
    // Envoi au back des données recueillies dans le formulaire
    axios
      .post(`${backEndUrl}/child`, formInfo)
      .then((response) => {
        if (response.status === 201) {
          setValidationMessage("Votre enfant a bien été ajouté.");
        }
      })

      .catch((err) => {
        if (err.response.status === 500)
          setValidationMessage("Erreur: Veuillez recommencer.");
      });
  };

  return (
    <div>
      {" "}
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formInfo.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formInfo.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Date de naissance AAAA/MM/JJ"
          value={formInfo.birthdate}
          pattern="\d{4}/\d{2}/\d{2}"
          onChange={handleChange}
        />
        <FormControl sx={{ display: "flex", justifyContent: "start" }}>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            sx={{
              fontSize: "small",
              display: "flex",
              justifyContent: "start",
            }}
          >
            Marcheur?
          </FormLabel>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={selectedValue}
            onChange={handleChange}
            sx={{}}
          >
            <FormControlLabel
              labelPlacement="start"
              value="Oui"
              control={<Radio />}
              label="Oui"
              size="small"
              sx={{ height: "30px" }}
            />
            <FormControlLabel
              labelPlacement="start"
              value="Non"
              control={<Radio />}
              label="Non"
              size="small"
              sx={{ height: "30px" }}
            />
          </RadioGroup>
        </FormControl>
        <input
          type="text"
          name="doctor"
          placeholder="Medecin traitant"
          value={formInfo.doctor}
          onChange={handleChange}
        />
      </form>
      <div className={style.validationMessage}>
        {validationMessage === "Erreur: Veuillez recommencer." ? (
          <Alert
            severity={
              validationMessage === "Erreur: Veuillez recommencer."
                ? "error"
                : "success"
            }
          >
            {validationMessage}
          </Alert>
        ) : null}
        {validationMessage !== "Votre enfant a bien été ajouté." ? (
          <button type="submit" className={style.button}>
            Ajouter mon enfant
          </button>
        ) : null}
      </div>
      {validationMessage === "Votre enfant a bien été ajouté." ? (
        <Alert
          severity={
            validationMessage === "Votre enfant a bien été ajouté."
              ? "success"
              : "error"
          }
        >
          {validationMessage}
        </Alert>
      ) : null}
    </div>
  );
}
