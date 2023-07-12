import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import style from "./DateChoice.module.css";
import instance from "../../../services/APIService";
import { useReservationContext } from "../../../contexts/ReservationContext";

export default function DateChoice() {
  const { reservation, setReservation } = useReservationContext();
  const { id } = useParams();
  const [pro, setPro] = useState(null);

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
    setReservation({
      ...reservation,
      proId: id,
      proName: pro.name,
      date: selectedDay,
    });
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
    <div>
      <ThemeProvider theme={theme}>
        <div className={style.card}>
          <div className={style.header_card}>
            <Link to={`/particulier/recherche/${pro.id}`}>
              <button type="button" className={style.button_back}>
                <ArrowBackIosNewIcon />
              </button>
            </Link>

            <div className={style.name_type}>
              <h2>Demandez une place</h2>
              <h3>Crèche {pro.name}</h3>
            </div>
          </div>
          <div className={style.card_body}>
            <h2>Choisissez une date</h2>
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
              <p>Vous souhaitez une réservation pour le:</p>
              {selectedDay && (
                <p className={style.reservation_day}>
                  {" "}
                  {selectedDay.toLocaleString("fr-FR", options)}
                </p>
              )}
            </div>
            <div className={style.button_reservation}>
              <Link to="/particulier/reservation/info">
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
