import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import instance from "../../../services/APIService";
import style from "./FormComplet.module.css";
import profilePicture from "../../../assets/ed-cannan.png";

export default function FormCompletWelcome() {
  const { id } = useParams();
  const [parent, setParent] = useState(null);
  useEffect(() => {
    instance
      .get(`/parent/${id}`)
      .then((response) => {
        setParent(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!parent) return null;

  return (
    <div className={style.page}>
      <Link to="/particulier">
        <button type="button" className={style.button_back}>
          <ArrowBackIosNewIcon />
        </button>
      </Link>
      <div className={style.header_card}>
        <div>
          <img src={profilePicture} alt="profilepicture" />
          <h3>
            {parent.lastname} {parent.firstname}
          </h3>
          <div>
            <p>
              Mettez toutes les chances de votre côté: un profil complet est
              nécessaire pour un accueil en crèche!
            </p>
          </div>
          <div>
            <Link to={`/particulier/${id}/child`}>
              <button type="button" className={style.buttonChild}>
                Dossier enfant
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${id}/parent`}>
              <button type="button" className={style.buttonParent}>
                Dossier parent
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
