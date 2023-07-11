import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormComplet.module.css";
import profilePicture from "../../../assets/ed-cannan.png";

export default function FormCompletWelcome() {
  const { user } = useUserContext();

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
            {user.lastname} {user.firstname}
          </h3>
          <div>
            <p>
              Mettez toutes les chances de votre côté: un profil complet est
              nécessaire pour un accueil en crèche!
            </p>
          </div>
          <div>
            <Link to={`/particulier/${user.id}/child`}>
              <button type="button" className={style.buttonChild}>
                Dossier enfant
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${user.id}/parent`}>
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
