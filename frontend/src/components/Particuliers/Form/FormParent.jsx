import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import style from "./FormParent.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

const schema = Joi.object({
  lastname: Joi.string().required().label("Lastname"),
  firstname: Joi.string().required().label("Firstname"),
  /* birthdate: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .required()
    .label("Birthdate"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
  address: Joi.string().required().label("Address"),
  postCode: Joi.string().required().label("Postcode"),
  city: Joi.string().required().label("City"),
  phoneNumber: Joi.string().required().label("Phone Number"), */
});
export default function FormParent() {
  const navigate = useNavigate();
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      lastname,
      firstname,
      birthdate,
      mail_address: email,
      password,
      address,
      postcode: postCode,
      city,
      phone_number: phoneNumber,
    };
    const { error } = schema.validate(formData);

    if (error) {
      console.error(error);
      return;
    }
    axios
      .post(`${backEndUrl}/parent`, formData)
      .then((response) => response.data)

      .catch((err) => console.error(err));
  };
  return (
    <div className={style.card}>
      <div className={style.header_card}>
        <button
          type="button"
          className={style.button_back}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </button>
        <div className={style.name_type}>
          <h2>Création de compte</h2>
        </div>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Date de naissance"
          value={birthdate}
          pattern="\d{2}/\d{2}/\d{4}"
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <input
          type="email"
          name="mail_address"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="Numéro et nom de voie"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          name="postcode"
          placeholder="Code postal"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="number"
          name="phone_number"
          placeholder="Téléphone mobile"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit" className={style.button}>
          Créer un compte
        </button>
      </form>
    </div>
  );
}
