import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Joi from "joi";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";

export default function FormChild() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    walking: "",
    doctor: "",
    parent_id: `${user.id}`,
  });

  useEffect(() => {
    if (!user?.id || user?.role === "pro") {
      navigate("/particulier");
    }
  }, []);

  const schema = Joi.object({
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    birthdate: Joi.number().integer().min(1900).required(),
    doctor: Joi.string().alphanum().min(3).max(30).required(),
  });

  const handleChange = (event) => {
    const field = event.target.name;

    if (field === "walking") {
      setFormInfo({ ...formInfo, walking: event.target.value });
    } else {
      setFormInfo({ ...formInfo, [field]: event.target.value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error);
    } else {
      setValidationMessage(null);
    }

    // Envoi au back des données recueillies dans le formulaire
    instance
      .post(`/child/register`, formInfo)
      .then((response) => {
        if (response.status === 201) {
          setValidationMessage("Votre enfant a bien été ajouté.");
          setFormInfo({
            lastname: "",
            firstname: "",
            birthdate: "",
            walking: "",
            doctor: "",
            parent_id: `${user.id}`,
          });
        }
      })

      .catch((err) => {
        if (err.response.status === 500)
          setValidationMessage("Erreur: Veuillez recommencer.");
      });
  };

  return (
    <div className={style.form_container}>
      <form
        className={style.form}
        onSubmit={(e) => handleSubmit(e)}
        name="form"
      >
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Nom"
          value={formInfo.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Prénom"
          value={formInfo.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="birthdate"
          id="birthdate"
          placeholder="Naissance AAAA/MM/JJ"
          value={formInfo.birthdate}
          pattern="\d{4}/\d{2}/\d{2}"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctor"
          id="doctor"
          placeholder="Medecin traitant"
          value={formInfo.doctor}
          onChange={handleChange}
          required
        />
        <fieldset className={style.radios}>
          <label htmlFor="walking">Marcheur?</label>
          <div className={style.radio}>
            <div>
              <input
                type="radio"
                id="1"
                name="walking"
                value="1"
                onChange={handleChange}
                required
              />
              <label htmlFor="1">Oui</label>
            </div>

            <div>
              <input
                type="radio"
                id="0"
                name="walking"
                value="0"
                onChange={handleChange}
              />
              <label htmlFor="0">Non</label>
            </div>
          </div>
        </fieldset>

        <div className={style.validation_message}>
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
          <button
            type="submit"
            className={style.button_validation}
            disabled={Object.values(formInfo)?.includes("")}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
