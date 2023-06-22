import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import style from "./WelcomePage.module.css";
import baby2 from "../../../assets/images/Babyplace.svg";

export default function WelcomePage() {
  return (
    <div className={style.welcomePage}>
      <div>
        <img src={baby2} alt="baby and mommy" />
        <div>
          <h2> Bienvenue !</h2>
          <h3>Votre compte a été créé avec succès!</h3>
          <p>
            L'accueil en structure collective nécessite que vous remplissiez des
            informations administratives obligatoires.
          </p>
          <h3>Compléter mon dossier</h3>
          <div>
            <h3>Je complèterais plus tard</h3>
            <Link to="/">
              <button type="button" className={style.button_back}>
                <ArrowForwardIosIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
