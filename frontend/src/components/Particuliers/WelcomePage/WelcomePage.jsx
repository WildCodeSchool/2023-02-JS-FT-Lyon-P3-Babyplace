import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./WelcomePage.module.css";
import baby2 from "../../../assets/images/Babyplace.svg";
import baby3 from "../../../assets/images/Babyplace3.svg";

export default function WelcomePage() {
  const { user } = useUserContext();
  return (
    <div className={style.welcomePage}>
      <div className={style.card}>
        <img src={baby3} alt="logo" />
        <img src={baby2} alt="baby and mommy" />
        <div className={style.text}>
          <h1> Bienvenue !</h1>
          <h3>Votre compte a été créé avec succès!</h3>
          <p>
            L'accueil en structure collective nécessite que vous remplissiez des
            informations administratives obligatoires.
          </p>
          <div className={style.file}>
            {/* TO DO: LINK */}
            <Link to={`/particulier/${user.id}`}>
              <h3>Compléter mon dossier</h3>
            </Link>
          </div>
          <div>
            <div className={style.fileLater}>
              {/* TO DO: LINK */}
              <Link to="/">
                <h3>Je complèterais plus tard</h3>
                <button type="button" className={style.button_back}>
                  <ArrowForwardIosIcon />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
