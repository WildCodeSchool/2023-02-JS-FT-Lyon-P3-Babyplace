import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormComplet.module.css";
import profilePicture from "../../../assets/images/avatar_Babyplace.jpg";

export default function FormCompletWelcome() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id || user?.role === "pro") {
      navigate("/particulier");
    }
  }, []);

  return (
    <div className={style.page}>
      <div className={style.header_card}>
        <div className={style.container}>
          <img
            className={style.profilePicture}
            src={profilePicture}
            alt="profilepicture"
          />
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
            <Link to={`/particulier/${user.id}/enfant`}>
              <button type="button" className={style.button_child}>
                Dossier enfant
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${user.id}/parent`}>
              <button type="button" className={style.button_parent}>
                Dossier parent
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
