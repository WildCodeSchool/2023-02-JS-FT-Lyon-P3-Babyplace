import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Chip, ListItem } from "@mui/material";
import style from "./SearchList.module.css";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function DispoPros({ id }) {
  const [dispos, setDispos] = useState(null);
  const [chipData] = useState([
    { key: 0, label: "monday" },
    { key: 1, label: "tuesday" },
    { key: 2, label: "wednesday" },
    { key: 3, label: "thursday" },
    { key: 4, label: "friday" },
    { key: 5, label: "saturday" },
    { key: 6, label: "sunday" },
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
          <ListItem key={data.key}>
            <Chip color={color} label={data.label} />
          </ListItem>
        );
      })}
    </div>
  );
}
DispoPros.propTypes = {
  id: PropTypes.number.isRequired,
};
