import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import HideImageIcon from "@mui/icons-material/HideImage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import instance from "../../../services/APIService";
import DispoPros from "../SearchList/DispoPros";
import style from "./ProDetails.module.css";

export default function ProDetails() {
  const { id } = useParams();
  const [pro, setPro] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    instance
      .get(`/pro/${id}`)
      .then((response) => setPro(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pro) return null;
  return (
    <div className={style.page}>
      <div className={style.header_card}>
        <Link to="/particulier/recherche">
          <button type="button" className={style.button_back}>
            <ArrowBackIosNewIcon />
          </button>
        </Link>

        <div className={style.name_type}>
          <h1>Crèche {pro.name}</h1>
          <h3>{pro.type}</h3>
        </div>
      </div>
      <div className={style.card_global}>
        <div className={style.card_left}>
          {pro.image ? (
            <img
              src={`${BACKEND_URL}/uploads/${pro.image}`}
              alt="profile_picture"
              className={style.image}
            />
          ) : (
            <HideImageIcon />
          )}

          <h3>Présentation</h3>
          <p>{pro.description}</p>
        </div>
        <div className={style.card_bottom}>
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
            <div className={style.button_reservation}>
              <Link to={`/particulier/recherche/${id}/date`}>
                <button type="button" className={style.button}>
                  Réserver
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
