import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import pro1test from "../../../assets/pro1test.jpg";
import user from "../../../assets/user.png";
import style from "./SearchList.module.css";
import DispoPros from "./DispoPros";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function SearchList() {
  const [pros, setPros] = useState(null);

  useEffect(() => {
    axios
      .get(`${backEndUrl}/pro`)
      .then((response) => setPros(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pros) return null;
  return (
    <div className={style.search_list_page}>
      <div className={style.logo_log_in}>
        <img src={user} alt="user" />
        Log In
      </div>
      <h2>Liste des crèches disponibles</h2>
      <div className={style.card_media}>
        {pros.map((pro) => (
          <Card key={pro.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={pro1test}
                alt="profil_picture"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pro.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <DispoPros id={pro.id} />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
