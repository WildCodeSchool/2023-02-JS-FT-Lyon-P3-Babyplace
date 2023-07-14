import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import styles from "./Requirements.module.css";

function Requirements() {
  const navigate = useNavigate();
  const { user, userChildren, setUserChildren } = useUserContext();

  // Lorsque le composant se monte : fetch des enfants du user.
  // Ils sont enregistrés dans un state pour permettre de vérifier la condition d'avoir au minimum un enfant pour réserver,
  // mais également pour l'écran suivant, afin d'afficher directement les enfants lors de la sélection de celui concerné par la réservation
  useEffect(() => {
    if (!user?.id) {
      navigate("/particulier");
    } else {
      instance
        .get(`/parent/child/${user.id}`)
        .then((response) => {
          if (response.data.length > 0) {
            setUserChildren(response.data);
          } else {
            setUserChildren(null);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className={styles.requirementsScreen}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.button_back}
      >
        <ArrowBackIosNewIcon />
      </button>

      <div className={styles.title}>
        <h1>Conditions de réservation</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.description}>
            <h2>
              Vous devez répondre aux conditions suivantes pour réserver :
            </h2>
          </div>
          {userChildren?.length > 0 ? (
            <div className={styles.requirement}>
              <VerifiedIcon color="success" />
              <p>Votre profil est complet.</p>
            </div>
          ) : (
            // Si aucun enfant trouvé dans le fetch, le message suivant est affiché, et l'utilisateur ne peut pas aller plus loin.
            <div className={styles.requirement}>
              <NewReleasesIcon color="error" />
              <p>Vous n'avez pas encore enregistré d'enfant.</p>
            </div>
          )}
        </div>
        <div className={styles.disclaimer}>
          <p>
            En cliquant sur le bouton ci-dessous, je m'engage à signaler à la
            crèche tout changement relatif à mes enfants qui iraient à
            l'encontre des conditions de réservation.
          </p>
        </div>
        <button
          type="button"
          disabled={!userChildren || userChildren.length === 0}
          className={
            userChildren?.length > 0 ? styles.button : styles.disabledButton
          }
          onClick={() => {
            if (userChildren?.length > 0)
              navigate("/particulier/reservation/enfant");
          }}
        >
          J'ai lu et j'accepte la consigne
        </button>
      </div>
    </div>
  );
}

export default Requirements;
