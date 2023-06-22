import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import style from "./FormParent.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function FormParent() {
  const { id } = useParams();
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

    axios
      .post(`${backEndUrl}/parent`, formData)
      .then((response) => response.data)

      .catch((err) => console.error(err));
  };
  return (
    <div className={style.card}>
      <div>
        <div className={style.header_card}>
          <button
            type="button"
            className={style.button_back}
            onClick={() => navigate(`/particulier/recherche/${id}/date`)}
          >
            <ArrowBackIosNewIcon />
          </button>
          <div className={style.name_type}>
            <h2>Création de compte</h2>
          </div>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              name="birthdate"
              placeholder="Date de naissance"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              name="mail_address"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Numéro et nom de voie"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="postcode"
              placeholder="Code postal"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="phone_number"
              placeholder="Téléphone mobile"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className={style.button}>
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
