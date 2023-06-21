import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import style from "./SearchList.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function DispoPros({ id }) {
  const [dispos, setDispos] = useState(null);
  const [chipData] = useState([
    { key: 0, label: "Lundi" },
    { key: 1, label: "Mardi" },
    { key: 2, label: "Mercredi" },
    { key: 3, label: "Jeudi" },
    { key: 4, label: "Vendredi" },
    { key: 5, label: "Samedi" },
    { key: 6, label: "Dimanche" },
  ]);
  useEffect(() => {
    axios
      .get(`${backEndUrl}/dispo/${id}`)
      .then((response) => {
        setDispos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!dispos) return null;
  return (
    <div className={style.dispos_pro}>
      {chipData.map((data) => {
        let color;
        for (let i = 0; i < dispos.length; i += 1) {
          if (data.label === dispos[i].day) {
            color = "success";
          }
        }

        return (
          <Chip
            color={color}
            label={data.label}
            sx={{ margin: "4px", borderRadius: "8px", cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
}
DispoPros.propTypes = {
  id: PropTypes.number.isRequired,
};
