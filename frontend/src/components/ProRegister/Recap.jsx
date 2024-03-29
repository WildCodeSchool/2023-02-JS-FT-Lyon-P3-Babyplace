import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import instance from "../../services/APIService";
import styles from "./Recap.module.css";
import { useUserContext } from "../../contexts/UserContext";

function Recap({
  registerInfo,
  fieldsToComplete,
  setActiveField,
  infoToModify,
  setInfoToModify,
}) {
  const { user, setUser, logout } = useUserContext();
  const [formValidationMessage, setFormValidationMessage] = useState(null);

  useEffect(() => {
    // Si le pro s'apprête à supprimer un jour de disponibilité, un message l'avertit des conséquences.
    if (
      infoToModify.disponibility?.length > 0 &&
      user.disponibility.some(
        (day) => !infoToModify.disponibility.includes(day)
      )
    ) {
      setFormValidationMessage(
        "Supprimer des jours de disponibilité aura pour effet d'annuler toutes les réservations positionnées sur ces jours. Si vous n'êtes pas sûr.e de vouloir annuler ces réservations, cliquez sur 'Annuler'."
      );
    }
  }, [infoToModify]);

  const handleSubmitRegister = () => {
    // Si un utilisateur est enregistré, la fonction met à jour le user dans la base de données et si la requête envoie une réponse positive, le user est mis à jour dans le contexte.

    if (user?.role === "pro") {
      let placesToAdd = 0;
      if (infoToModify.place) {
        if (infoToModify.place < user.place) {
          // TODO si l'utilisateur déclare moins de places que précédemment enregistrées, il faut en supprimer.
          setInfoToModify({});
          return setFormValidationMessage(
            "Vous ne pouvez pas supprimer de places. Veuillez recommencer."
          );
        }
        if (infoToModify.place > user.place) {
          // si l'utilisateur déclare plus de places que précédemment enregistrées, il faut en ajouter
          placesToAdd = infoToModify.place - user.place;
        }
      }
      const daysToAdd = [];
      const daysToRemove = [];
      if (infoToModify.disponibility) {
        for (const day of infoToModify.disponibility) {
          if (!user.disponibility.includes(day)) {
            // les disponibilités précédemment enregistrées ne contiennent pas un jour que l'utilisateur indique dans ses données modifiées
            // il faut donc ajouter le jour dans la base de données
            daysToAdd.push(day);
          }
        }
        for (const day of user.disponibility) {
          if (!infoToModify.disponibility.includes(day)) {
            // TODO si l'utilisateur déclare moins de disponibilités que précédemment enregistrées, il faut en supprimer.
            daysToRemove.push(day);
          }
        }
      }
      return instance
        .patch(`/pro/${user.id}`, {
          ...infoToModify,
          placesToAdd,
          daysToAdd,
          daysToRemove,
        })
        .then((response) => {
          if (response.status !== 204) {
            return setFormValidationMessage(
              "Il y a eu un problème, merci d'essayer plus tard."
            );
          }
          setUser({ ...user, ...infoToModify });
          setInfoToModify({});
          return setFormValidationMessage(
            "Les informations ont bien été mises à jour."
          );
        })
        .catch((error) => {
          if (error.response.status === 401) {
            logout(true);
          }
          console.error(error);
        });
    }

    // Si on est dans le contexte d'une inscription, la fonction fait une requête vers la base de données pour enregistrer l'utilisateur.
    return instance
      .post(`/pro/register`, registerInfo)
      .then((response) => {
        if (response.status === 201) {
          setFormValidationMessage(
            "Compte créé. Vous pouvez désormais vous connecter."
          );
        }
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setFormValidationMessage("Veuillez utiliser une autre adresse mail");
        } else {
          setFormValidationMessage(
            "Il y a eu un problème. Réessayez plus tard."
          );
        }
      });
  };

  useEffect(() => {
    setInfoToModify({});
  }, []);

  // Le bloc suivant gère le rendu dans le cas où l'utilisateur est connecté (partie modification du dashboard)
  if (user?.role === "pro") {
    return (
      <div className={styles.recapPage}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={styles.text}>
              <h2>Voici le résumé de vos informations</h2>
            </div>
          </Grid>
          <div className={styles.recapBlock}>
            {fieldsToComplete.map((field) => {
              if (field.field === "Informations de connexion") {
                return null;
              }
              const fieldsToConcatenate = [];
              for (const fieldBlock of fieldsToComplete) {
                if (fieldBlock.field === field.field) {
                  for (const row of fieldBlock.data) {
                    fieldsToConcatenate.push(row.field);
                  }
                }
              }
              const valuesToConcatenate = [];
              let modifiedField = false;
              // Les lignes suivantes concatènent les informations et les affichent dans les blocs du récap sous certaines conditions
              Object.entries(user).forEach((array) => {
                if (
                  fieldsToConcatenate.includes(array[0]) &&
                  array[0] !== "password" &&
                  array[0] !== "verifyPassword" &&
                  array[1] !== "" &&
                  array[1] !== null
                ) {
                  if (Object.keys(infoToModify).includes(array[0])) {
                    Object.entries(infoToModify).forEach((entry) => {
                      if (entry[0] === array[0]) {
                        modifiedField = true;
                        return valuesToConcatenate.push(entry[1]);
                      }
                      return null;
                    });
                  } else {
                    valuesToConcatenate.push(array[1]);
                  }
                }
              });
              return (
                <Grid item xs={12}>
                  <TextField
                    disabled
                    key={field.field}
                    label={field.field}
                    margin="normal"
                    value={
                      valuesToConcatenate.length >= 1
                        ? valuesToConcatenate.join(", ")
                        : ""
                    }
                    content={field.field}
                    color={
                      valuesToConcatenate.length >= 1 ? "success" : "warning"
                    }
                  />
                  {modifiedField ? (
                    <EditIcon color="success" />
                  ) : (
                    <DoNotDisturbIcon color="disabled" />
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveField(field.field);
                    }}
                  >
                    Modifier
                  </Button>
                </Grid>
              );
            })}
          </div>
          <Grid item xs={12}>
            {formValidationMessage ? (
              <Alert
                severity={
                  formValidationMessage ===
                    "Supprimer des jours de disponibilité aura pour effet d'annuler toutes les réservations positionnées sur ces jours. Si vous n'êtes pas sûr.e de vouloir annuler ces réservations, cliquez sur 'Annuler'." ||
                  formValidationMessage ===
                    "Vous ne pouvez pas supprimer de places. Veuillez recommencer." ||
                  formValidationMessage ===
                    "Vous ne pouvez pas supprimer de disponibilités. Veuillez recommencer." ||
                  formValidationMessage ===
                    "Il y a eu un problème. Réessayez plus tard."
                    ? "error"
                    : "success"
                }
              >
                {formValidationMessage}
              </Alert>
            ) : null}
            <div className={styles.recapFooter}>
              <Button
                variant="contained"
                disabled={Object.values(infoToModify).length <= 1}
                onClick={() => {
                  setFormValidationMessage(null);
                  setInfoToModify({});
                }}
              >
                Annuler
              </Button>
              {/* Tant que toutes les données de formulaires ne sont pas renseignées, le bouton OK est désactivé */}

              <Button
                onClick={handleSubmitRegister}
                variant="contained"
                disabled={
                  Object.values(infoToModify).length <= 1 ||
                  Object.values(infoToModify).includes(null) ||
                  Object.values(infoToModify).includes([]) ||
                  Object.values(infoToModify).includes("")
                }
              >
                Terminer
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  // Le bloc suivant gère le rendu dans le cas où l'utilisateur n'est pas connecté (partie inscription)
  if (user?.role !== "pro")
    return (
      <div className={styles.recapPage}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={styles.text}>
              <h2>Voici le résumé de vos informations</h2>
            </div>
          </Grid>
          <div className={styles.recapBlock}>
            {fieldsToComplete.map((field) => {
              const fieldsToConcatenate = [];
              for (const fieldBlock of fieldsToComplete) {
                if (fieldBlock.field === field.field) {
                  for (const row of fieldBlock.data) {
                    fieldsToConcatenate.push(row.field);
                  }
                }
              }
              const valuesToConcatenate = [];
              // Les lignes suivantes concatènent les informations et les affichent dans les blocs du récap sous certaines conditions
              Object.entries(registerInfo).forEach((array) => {
                if (
                  fieldsToConcatenate.includes(array[0]) &&
                  array[0] !== "password" &&
                  array[0] !== "verifyPassword" &&
                  array[1] !== "" &&
                  array[1] !== null
                ) {
                  valuesToConcatenate.push(array[1]);
                }
              });

              return (
                <Grid item xs={12}>
                  <TextField
                    disabled
                    key={field.field}
                    label={field.field}
                    margin="normal"
                    value={
                      valuesToConcatenate.length >= 1
                        ? valuesToConcatenate.join(", ")
                        : ""
                    }
                    content={field.field}
                    color={valuesToConcatenate ? "success" : "warning"}
                  />
                  {valuesToConcatenate.length >= 1 ? (
                    <CheckIcon color="success" />
                  ) : (
                    <DoNotDisturbIcon color="warning" />
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveField(field.field);
                    }}
                  >
                    Modifier
                  </Button>
                </Grid>
              );
            })}
          </div>
          <Grid item xs={12}>
            {formValidationMessage ? (
              <Alert
                severity={
                  formValidationMessage ===
                    "Veuillez utiliser une autre adresse mail" ||
                  formValidationMessage ===
                    "Il y a eu un problème. Réessayez plus tard."
                    ? "error"
                    : "success"
                }
              >
                {formValidationMessage}
              </Alert>
            ) : null}
            <div className={styles.modifyRecapFooter}>
              {/* Tant que toutes les données de formulaires ne sont pas renseignées, le bouton OK est désactivé */}
              {formValidationMessage ===
              "Compte créé. Vous pouvez désormais vous connecter." ? (
                <Link to="/pro">
                  <Button variant="contained">Se connecter</Button>
                </Link>
              ) : (
                <Button
                  onClick={handleSubmitRegister}
                  variant="contained"
                  disabled={
                    Object.values(registerInfo).includes(null) ||
                    Object.values(registerInfo).includes([]) ||
                    Object.values(registerInfo).includes("")
                  }
                >
                  Terminer
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
}

export default Recap;

Recap.propTypes = {
  registerInfo: PropTypes.arrayOf.isRequired,
  fieldsToComplete: PropTypes.arrayOf.isRequired,
  setActiveField: PropTypes.func.isRequired,
  infoToModify: PropTypes.shape.isRequired,
  setInfoToModify: PropTypes.func.isRequired,
};
