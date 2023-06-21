import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "./DateChoice.module.css";
import { Chip, Stack } from "@mui/material";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function DateChoice() {
  const { id } = useParams();
  const [pro, setPro] = useState(null);
  /*   const date = new Date();
  const day = date.getDate();

  for (var i = 0; i < 7; i++) {
    date.setDate(day + i);
  }
  /*   const [chipData] = useState([
    { key: 0, label: { day } },
    { key: 1, label: "M" },
    { key: 2, label: "M" },
    { key: 3, label: "J" },
    { key: 4, label: "V" },
    { key: 5, label: "S" },
    { key: 6, label: "D" },
  ]); */

  /*  const [selectedDate, setSelectedDate] = useState(null);
  const chip = document.getElementsByTagName("Chip");
  function handleClick() {
    console.log("click on", date);
  } */

  /*  const [buttonText, setButtonText] = useState("");

  const handleClick = (event) => {
    const buttonText = event.target.innerHTML;
    setButtonText(buttonText);
  }; 
  const daysOfWeek = [{ day: day }, { day: day + 1 }];
  const [selectedDay, setSelectedDay] = useState("");

  const handleClick = (day) => {
    setSelectedDay(day);
  }; */

  const [selectedDay, setSelectedDay] = useState("");

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  const getFutureDates = () => {
    const today = new Date();
    const futureDates = [];

    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i + 1
      );
      futureDates.push(futureDate.toLocaleDateString());
    }

    return futureDates;
  };
  useEffect(() => {
    axios
      .get(`${backEndUrl}/pro/${id}`)
      .then((response) => setPro(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pro) return null;

  return (
    <div>
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
            {getFutureDates().map((day) => (
              <Chip
                key={day}
                label={day}
                onClick={() => handleClick(day)}
                color={selectedDay === day ? "primary" : "default"}
              />
            ))}
          </div>

          <div className={style.chip}>
            <h3>Jours de la semaine</h3>
          </div>
          <div className={style.reservation}>
            <p>Vous souhaitez une réservation pour le:</p>
            {selectedDay && <p> {selectedDay}</p>}
          </div>
          <div className={style.button_reservation}>
            <button type="button" className={style.button}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
