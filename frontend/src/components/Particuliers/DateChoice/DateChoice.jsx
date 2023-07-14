import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import style from "./DateChoice.module.css";
import instance from "../../../services/APIService";
import { useReservationContext } from "../../../contexts/ReservationContext";
import { useUserContext } from "../../../contexts/UserContext";

export default function DateChoice() {
  const { reservation, setReservation } = useReservationContext();
  const { id } = useParams();
  const [pro, setPro] = useState(null);
  const { user, setPendingReservation } = useUserContext();

  // Creation palette personnalisée pour MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(28, 187, 140)",
      },
    },
  });

  // Mise en place du recueil des dates
  const [selectedDay, setSelectedDay] = useState("");

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  const handleNext = () => {
    const day = [
      `${selectedDay.getFullYear()}`,
      `${selectedDay.getMonth() + 1}`,
      `${selectedDay.getDate()}`,
    ]
      .map((string) => (string.length === 1 ? `0${string}` : string))
      .join("-");
    // On gère l'alimentation d'un state de réservation afin de garder les infos au fil du parcous de réservation
    setReservation({
      ...reservation,
      proId: id,
      proName: pro.name,
      date: selectedDay,
      day,
    });
    if (!user?.id) {
      // Si l'utilisateur n'est pas connecté, sauvegarde de l'id du pro dont il consultait le profil afin de revenir à la page de sélection de la date une fois connecté (cf userContext)
      setPendingReservation(id);
    }
  };

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const getFutureDates = () => {
    const today = new Date();
    const futureDates = [];

    for (let i = 0; i < 7; i += 1) {
      const futureDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i + 1
      );
      futureDates.push(futureDate);
    }

    return futureDates;
  };
  useEffect(() => {
    instance
      .get(`/pro/${id}`)
      .then((response) => setPro(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pro) return null;

  return (
    <div className={style.page}>
      <ThemeProvider theme={theme}>
        <div className={style.header_card}>
          <Link to={`/particulier/recherche/${pro.id}`}>
            <button type="button" className={style.button_back}>
              <ArrowBackIosNewIcon />
            </button>
          </Link>

          <div className={style.name_type}>
            <h1>Demandez une place</h1>
            <h3>Crèche {pro.name}</h3>
          </div>
        </div>
        <div className={style.cards_media}>
          <div className={style.card_body}>
            <h1>Choisissez une date</h1>
            <div>
              <div className={style.days_of_week}>
                <h3>Jours de la semaine prochaine:</h3>
              </div>
              <div className={style.chip}>
                {getFutureDates().map((day) => (
                  <Chip
                    key={day}
                    label={day.toLocaleString("fr-FR", options)}
                    onClick={() => handleClick(day)}
                    color={`${selectedDay === day ? "primary" : "default"}`}
                    sx={{
                      margin: "4px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={style.reservation}>
              <p>Vous souhaitez une réservation pour le :</p>
              {selectedDay && (
                <p className={style.reservation_day}>
                  {" "}
                  {selectedDay.toLocaleString("fr-FR", options)}
                </p>
              )}
            </div>

            <div className={style.button_reservation}>
              <Link to="/particulier/reservation">
                <button
                  type="button"
                  className={selectedDay ? style.button : style.disabledButton}
                  onClick={() => handleNext()}
                  disabled={!selectedDay}
                >
                  Suivant
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
