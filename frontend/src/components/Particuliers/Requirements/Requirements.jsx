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

  useEffect(() => {
    if (!user?.id) {
      navigate("/particulier");
    } else {
      instance
        .get(`/parent/child/${user.id}`)
        .then((response) => {
          setUserChildren(response.data);
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
          <div className={styles.requirements}>
            <div className={styles.requirement}>
              <VerifiedIcon color="success" />
              <p>Votre profil est complet.</p>
            </div>
            {userChildren ? (
              <div className={styles.requirement}>
                <VerifiedIcon color="success" />
                <p>Vous avez enregistré au moins un enfant.</p>
              </div>
            ) : (
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
            disabled={!userChildren}
            className={userChildren ? styles.button : styles.disabledButton}
            onClick={() => navigate("/particulier/reservation/enfant")}
          >
            J'ai lu et j'accepte la consigne
          </button>
        </div>
      </div>
    </div>
  );
}

export default Requirements;
