import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "./WelcomePage.module.css";
import baby2 from "../../../assets/images/Babyplace.svg";
import baby3 from "../../../assets/images/Babyplace3.svg";

export default function WelcomePage() {
  return (
    <div className={style.welcomePage}>
      <Link to="/particulier/register">
        <button type="button" className={style.button_back}>
          <ArrowBackIosNewIcon />
        </button>
      </Link>
      <div className={style.card}>
        <img className={style.logo1} src={baby3} alt="logo" />
        <img className={style.logo2} src={baby2} alt="baby and mommy" />
        <div className={style.text}>
          <h1> Bienvenue !</h1>
          <h3>Votre compte a été créé avec succès!</h3>
          <p>
            L'accueil en structure collective nécessite que vous remplissiez des
            informations administratives obligatoires.
          </p>
          <div className={style.file}>
            <Link to="/particulier">
              <h3>Compléter mon dossier</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
