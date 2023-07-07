import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import instance from "../../../services/APIService";
import style from "./SearchList.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(28, 187, 140)",
    },
  },
});
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
    instance
      .get(`/dispo/${id}`)
      .then((response) => {
        setDispos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!dispos) return null;
  return (
    <ThemeProvider theme={theme}>
      <div className={style.dispos_pro}>
        {chipData.map((data) => {
          let color;
          for (let i = 0; i < dispos.length; i += 1) {
            if (data.label === dispos[i].day) {
              color = "primary";
            }
          }

          return (
            <Chip
              key={data.label}
              color={color}
              label={data.label}
              sx={{ margin: "4px", borderRadius: "8px", cursor: "pointer" }}
            />
          );
        })}
      </div>
    </ThemeProvider>
  );
}
DispoPros.propTypes = {
  id: PropTypes.number.isRequired,
};
