import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import pro1test from "../../../assets/pro1test.jpg";
import DispoPros from "../SearchList/DispoPros";
import style from "./ProDetails.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function ProDetails() {
  const { id } = useParams();
  const [pro, setPro] = useState(null);

  useEffect(() => {
    axios
      .get(`${backEndUrl}/pro/${id}`)
      .then((response) => setPro(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pro) return null;
  return (
    <div className={style.card}>
      <div className={style.header_card}>
        <Link to="/particulier/recherche">
          <button type="button" className={style.button_back}>
            <ArrowBackIosNewIcon />
          </button>
        </Link>

        <div className={style.name_type}>
          <h2>Crèche {pro.name}</h2>
          <h4>{pro.type}</h4>
        </div>
      </div>
      <div className={style.card_global}>
        <img src={pro1test} alt="profile_picture" className={style.image} />
        <div className={style.presentation}>
          <h3>Présentation</h3>
          <p>{pro.description}</p>
          <div className={style.informations}>
            <InfoIcon />
            <div className={style.tel_mail}>
              <p>Téléphone: {pro.phone_number}</p>
              <p>Mail: {pro.mail_address}</p>
            </div>
          </div>
          <div>
            <h3>Disponibilités</h3>
            <DispoPros id={pro.id} />
            <div>
              <div>
                <div className={style.button_reservation}>
                  <button type="button" className={style.button}>
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
