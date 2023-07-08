import React, { useState } from "react";
import { Alert } from "@mui/material";
import Joi from "joi";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";
import ResumeChild from "./ResumeChild";

export default function FormChild() {
  const { user } = useUserContext();
  const [validationMessage, setValidationMessage] = useState(null);
  const [showChild, setShowChild] = useState(false);
  const [formInfo, setFormInfo] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    walking: "",
    doctor: "",
    parent_id: `${user.id}`,
  });

  const schema = Joi.object({
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    birthdate: Joi.number().integer().min(1900).required(),
    doctor: Joi.string().alphanum().min(3).max(30).required(),
  });
  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
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
        }
      })

      .catch((err) => {
        if (err.response.status === 500)
          setValidationMessage("Erreur: Veuillez recommencer.");
      });
  };

  return (
    <div>
      {showChild ? <ResumeChild /> : null}
      <div>
        <form className={style.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formInfo.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formInfo.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birthdate"
            placeholder="Date de naissance AAAA/MM/JJ"
            value={formInfo.birthdate}
            pattern="\d{4}/\d{2}/\d{2}"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="doctor"
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
              onClick={() => {
                setShowChild(!showChild);
              }}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
