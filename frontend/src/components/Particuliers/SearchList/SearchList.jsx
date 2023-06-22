import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import pro1test from "../../../assets/images/pro1test.jpg";
import user from "../../../assets/icones/user.png";
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
        <Link to="/particulier">Log In</Link>
      </div>
      <h2>Liste des crèches disponibles</h2>
      <div className={style.cards_media}>
        <div className={style.card_media}>
          {pros.map((pro) => (
            <Link key={pro.id} to={`/particulier/recherche/${pro.id}`}>
              <Card key={pro.id} sx={{ maxWidth: 345, margin: 2 }}>
                <CardActionArea sx={{ padding: "10px" }}>
                  <div className="style.image">
                    <CardMedia
                      component="img"
                      height="140"
                      image={pro1test}
                      alt="profil_picture"
                      sx={{
                        position: "relative",
                        zIndex: 10,
                        background: "linear-gradient(to bottom, red, orange)",
                      }}
                    />
                  </div>

                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    sx={{
                      position: "absolute",
                      top: "100px",
                      left: "20px",
                      color: "white",
                      zIndex: 12,
                    }}
                  >
                    {pro.name}
                  </Typography>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <DispoPros id={pro.id} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
